import League from "../models/league.model.js";
import User from "../models/user.model.js";
import fetch from "node-fetch";

import sgMail from "@sendgrid/mail";

import dotenv from "dotenv";
dotenv.config();

export const createLeague = async (req, res, body) => {
  const {
    LeagueName,
    LeagueOwner,
    LeagueOwnerEmail,
    NumTeams,
    ZipCodes,
    City,
    StartDate,
    Status,
    Matches,
  } = req.body;

  if (!LeagueName) {
    return res.json({
      error: "LeagueName is required!",
    });
  }
  if (!LeagueOwner) {
    return res.json({
      error: "LeagueOwner is required!",
    });
  }
  if (!NumTeams || NumTeams < 3) {
    return res.json({
      error: "There has to be a minimum of 3 teams!",
    });
  }

  if (!ZipCodes || ZipCodes.some((e) => e.length !== 5)) {
    return res.json({
      error: "Valid zip code is required!",
    });
  }
  if (!City) {
    return res.json({
      error: "City is required!",
    });
  }

  if (!StartDate) {
    return res.json({
      error: "Start Date is required!",
    });
  }

  const existLeagueName = await League.findOne({ LeagueName });
  if (existLeagueName) {
    return res.json({
      error: "League name already exists!",
    });
  }

  const existUsername = await User.findOne({ LeagueOwner });
  if (!existUsername) {
    return res.json({
      error: "League owner does not exist!",
    });
  }

  try {
    const league = await new League({
      LeagueName,
      LeagueOwner,
      LeagueOwnerEmail,
      NumTeams,
      ZipCodes,
      City,
      StartDate,
      Status,
      Matches
    }).save();

    return res.json({ message: "League was successfully created!" });
  } catch (error) {
    console.log(error);
    return res.error;
  }
};

export const updateLeague = async (req, res, body) => {
  /*
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:'No such Tournament'})
  }
  const tourney = await Tournament.findOneAndUpdate({_id:id}, {...req.body})
  if (!tourney){
      return res.status(400).json({error:'No such Tournament'})
  }
  res.status(200).json(tourney)
  */
  console.log(req.body);
  await League.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

export const getLeagues = async (req, res) => {
  const allLeagues = await League.find({}).sort({ createdAt: -1 });
  res.status(200).json(allLeagues);
};

export const getLeague = async (req, res) => {
  const leagues = await League.find({ ZipCodes: req.params.zip })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

export const deleteLeague = async (req, res) => {
  await League.findByIdAndDelete(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

export const getAddressInfo = async (req, res) => {
  const apiKey = process.env.GEOAPIFY;
  const input = req.query.input;

  console.log(input)

  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${apiKey}`;
  try {
    const requestOptions = {
      method: "GET",
    };
    await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    console.error("Error fetching address information:", error);
    res.status(400).json(error);
  }
};

/**
 * function that takes a list of teams and creates matchups with dates
 * @param {list} teamList 
 * @returns matchup objects
 */
const createMatchups = (teamList) => {
  const combos = [];

  for (let i = 0; i < teamList.length - 1; i++) {
      for (let j = i + 1; j < teamList.length; j++) {
          combos.push([teamList[i], teamList[j]]);
      }
  }

  // Set up the dates
  const today = new Date();
  const nextSaturday = new Date(today);

  // Find the next Saturday
  nextSaturday.setDate(today.getDate() + (6 - today.getDay()) + 1);

  const matchups = [];
  
  combos.forEach((combo, index) => {
    const assignedDate = new Date(nextSaturday);
    assignedDate.setDate((assignedDate.getDate() + index * 7) - 1);
    // matchupAssignments[matchup] = assignedDate.toDateString();
    let matchup = {
      "Date": assignedDate.toDateString(),
      "Team1": combos[index][0],
      "Team2": combos[index][1],
      "Score": "",
      "WinnerTeam": ""
    }
    matchups.push(matchup)
});

  return matchups
}

// createMatchups(["Team1", "Team2", "Team3", "Team4", "Team5"])

/**
 * startLeague is responsible for:
 * 1. starting the league by changing the status to ONGOING
 * 2. creating the matchups between the teams
 * @param {*} req request object
 * @param {*} res response object
 */
export const startLeague = async (req, res) => {
  // Create an update object
  let updateObject = { 
    Status: "ONGOING" 
  }

  // Get the list of team names from the database
  let league = await League.findById(req.params.id);
  let teams = league["Teams"];
  let teamNames = []

  // Get the team names from the teams list
  for (let i = 0; i < teams.length; i++) {
    teamNames.push(teams[i]["TeamName"])
  }

  // Get the matchups
  updateObject['Matches'] = createMatchups(teamNames)

  // Change the status of the league to ongoing
  await League.findByIdAndUpdate(req.params.id, updateObject)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });


  // Get the list of teams and their captains
  // Send an email to the captains of each team
  for (let i = 0; i < teams.length; i++) {
    sendEmail(
      teams[i]["CaptainEmail"],
      `Your league, ${league["LeagueName"]}, has begun`,
      `Your league, ${league["LeagueName"]}, has begun`
    );
  }
};

// Gets the name, wins, and losses of the league
export const getStandings = async (req, res) => {
  try {
    let league = await League.findById(req.params.id);
    let teams = league["Teams"]
    let matches = league["Matches"];
    let standings = {};

    // get team names from team objects list
    for (let i = 0; i < teams.length; i++) {
      standings[teams[i]["TeamName"]] = { teamWins: 0, teamLosses: 0, matchWins: 0, matchLosses: 0};
    }

    for (let i = 0; i < matches.length; i++) {
      let Team1 = matches[i]["Team1"];
      let Team2 = matches[i]["Team2"];
      let WinnerTeam = matches[i]["WinnerTeam"]

      // tally wins and losses
      if (WinnerTeam) {
        let matchWins = parseInt(matches[i]["Score"][0]);
        let matchLosses = parseInt(matches[i]["Score"][2]);
        standings[WinnerTeam].teamWins += 1;
        standings[WinnerTeam].matchWins += matchWins;
        standings[WinnerTeam].matchLosses += matchLosses;
        standings[WinnerTeam === Team1 ? Team2 : Team1].teamLosses += 1;
        standings[WinnerTeam === Team1 ? Team2 : Team1].matchLosses += matchWins;
        standings[WinnerTeam === Team1 ? Team2 : Team1].matchWins += matchLosses;
      }
    }

    res.status(200).json(standings);
  } catch (error) {
    console.error("Error fetching team standings:", error);
    res.status(500).send("Internal Server Error");
  }
};

/*
Sends a request to the captain of the team
Captain of the team should be in req.params
*/
export const sendRequestEmail = async (req, res) => {
  console.log(`Going to send email to ${req.query.sendTo}`);

  sendEmail(
    req.query.sendTo,
    `${req.query.user} wants to join your team`,
    `${req.query.user} has requested to join your team! Log onto Punchshot Pickleball to accept this user.`
  );
};

const sendEmail = async (email, subject, body) => {
  sgMail.setApiKey(process.env.SENDGRID);
  const message = {
    to: `${email}`,
    from: "tcolina3@gatech.edu",
    subject: `${subject}`,
    text: `${body}`,
  };

  await sgMail
    .send(message)
    .then((response) => console.log("Email sent..."))
    .catch((error) => console.log(error.response.body));
};

export const testroute = async (req, res) => {
  console.log("got here");
};

/**
 * Cron functionality to send emails out to league owners
 * Happens once per day
 */
import cron from "node-cron";
cron.schedule("0 0 * * *", () => {
  sendLeagueStartEmails();
});

function isDayBeforeCurrentDate(targetDate) {
  // Get the current date
  let currentDate = new Date();

  // Adjust the current date to be one day later
  currentDate.setDate(currentDate.getDate() + 1);

  // convert to strings for comparison
  currentDate = currentDate.toString();
  targetDate = targetDate.toString();

  return currentDate.substring(0, 15) === targetDate.substring(0, 15);
}

const sendLeagueStartEmails = async () => {
  // Get all of the leagues
  const allLeagues = await League.find({}).sort({ createdAt: -1 });

  // Get the current date
  let currentDate = new Date();

  for (let i = 0; i < allLeagues.length; i++) {
    // check if the current date = allLeagues[i]'s starting date
    let leagueDate = allLeagues[i]["StartDate"];

    if (isDayBeforeCurrentDate(leagueDate)) {
      // If day before the allLeagues[i] starts, send email to league owner
      console.log(
        `It is the day before ${allLeagues[i]["LeagueName"]} starts, sending email to league owner`
      );
      sendEmail(
        allLeagues[i]["LeagueOwnerEmail"],
        "league starts tomorrow",
        `It is the day before ${allLeagues[i]["LeagueName"]} starts. Remember to start the league tomorrow.`
      );
    } else {
      console.log(
        `It is not the day before ${allLeagues[i]["LeagueName"]} starts`
      );
    }
  }
};
