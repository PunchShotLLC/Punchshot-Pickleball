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
    SkillLevel,
    Division,
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

  if (!SkillLevel) {
    return res.json({
      error: "Skill Level is required!",
    });
  }

  if (!Division) {
    return res.json({
      error: "Division is required!",
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
      Matches,
      SkillLevel,
      Division,
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
  const apiKey = process.env.GOOGLE;
  const input = req.query.input;

  console.log(input);

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
  try {
    const requestOptions = {
      method: "GET",
    };
    await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        res.status(200).json(result);
        console.log(result);
        console.log("hi");
      });
  } catch (error) {
    console.error("Error fetching address information:", error);
    res.status(400).json(error);
  }
};

/**
 * helper function for createMatchups that gets the next saturday
 * @returns the next saturday
 */
function getNextSaturday() {
  const today = new Date();
  const daysUntilSaturday = 6 - today.getDay(); // Calculate days until Saturday
  const nextSaturday = new Date(today);
  nextSaturday.setDate(today.getDate() + daysUntilSaturday);
  return nextSaturday;
}

/**
 * function written by chatgpt to generate team matchupes
 *   - ensures that floor(#teams/2) are scheduled for each week
 *   - ensures that no team plays on two matches on the same day
 * @param {*} teams
 * @returns matchups per week
 */
function scheduler(teams) {
  if (teams.length % 2 !== 0) {
    teams.push(null); // Add a dummy team if the number of teams is odd
  }

  const weeks = [];
  let currentSaturday = getNextSaturday();

  for (let weekNum = 1; weekNum < teams.length; weekNum++) {
    const matchups = [];
    for (let i = 0; i < teams.length / 2; i++) {
      const match = [teams[i], teams[teams.length - i - 1]];
      matchups.push(match);
    }
    weeks.push({ date: currentSaturday.toDateString(), matchups });

    // Move to the next Saturday for the next week
    currentSaturday.setDate(currentSaturday.getDate() + 7);

    // Rotate the teams for the next week
    teams = [teams[0]].concat([teams[teams.length - 1]], teams.slice(1, -1));
  }

  return weeks;
}

/**
 * function that takes a list of teams and returns an array of matches in this format:
 * @param {*} teams the list of team names (found in the object)
 * @returns array of matches in the following format
 * {
      "Date": week.date,
      "Team1": week.matchups[i][0],
      "Team2": week.matchups[i][1],
      "Score": "",
      "WinnerTeam": ""
    }
 */
function createMatchups(teams) {
  const schedule = scheduler(teams);

  let matches = [];
  schedule.forEach((week, weekNum) => {
    for (let i = 0; i < week.matchups.length; i++) {
      if (week.matchups[i][0] !== null && week.matchups[i][1] !== null) {
        matches.push({
          Date: week.date,
          Team1: week.matchups[i][0],
          Team2: week.matchups[i][1],
          Score: "",
          WinnerTeam: "",
        });
      }
    }
  });

  return matches;
}

// console.log(createMatchups(["Team1", "Team2", "Team3", "Team4", "Team5"]))

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
    Status: "ONGOING",
  };

  // Get the list of team names from the database
  let league = await League.findById(req.params.id);
  let teams = league["Teams"];
  let teamNames = [];

  // Get the team names from the teams list
  for (let i = 0; i < teams.length; i++) {
    teamNames.push(teams[i]["TeamName"]);
  }

  // Get the matchups
  updateObject["Matches"] = createMatchups(teamNames);

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
    let teams = league["Teams"];
    let matches = league["Matches"];
    let standings = {};

    // get team names from team objects list
    for (let i = 0; i < teams.length; i++) {
      standings[teams[i]["TeamName"]] = {
        teamWins: 0,
        teamLosses: 0,
        matchWins: 0,
        matchLosses: 0,
      };
    }

    for (let i = 0; i < matches.length; i++) {
      let Team1 = matches[i]["Team1"];
      let Team2 = matches[i]["Team2"];
      let WinnerTeam = matches[i]["WinnerTeam"];

      // tally wins and losses
      if (WinnerTeam) {
        let matchWins = parseInt(matches[i]["Score"][0]);
        let matchLosses = parseInt(matches[i]["Score"][2]);
        standings[WinnerTeam].teamWins += 1;
        standings[WinnerTeam].matchWins += matchWins;
        standings[WinnerTeam].matchLosses += matchLosses;
        standings[WinnerTeam === Team1 ? Team2 : Team1].teamLosses += 1;
        standings[WinnerTeam === Team1 ? Team2 : Team1].matchLosses +=
          matchWins;
        standings[WinnerTeam === Team1 ? Team2 : Team1].matchWins +=
          matchLosses;
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
cron.schedule("0 8 * * *", (date) => {
  matchCronJob(date);
});
const matchCronJob = async (date) => {
  const leagues = await League.find({});
  leagues
    .filter((league) => league.Status === "ONGOING")
    .forEach((league) => {
      league.Matches.forEach((match, index, matches) => {
        const matchTeams = league.Teams.filter(
          (team) =>
            team.TeamName === match.Team1 || team.TeamName === match.Team2
        );
        const afterMatch = date.getTime() > Date.parse(match.Date);
        //Day before match case
        if (isDayBeforeCurrentDate(match.Date)) {
          matchTeams.forEach((team) => {
            sendEmail(
              team.teamCaptainEmail,
              "You have a match tommorow",
              `It is the day before your match against ${
                team.TeamName === match.Team1 ? match.Team2 : match.Team1
              } starts. Make sure to let your team now. Good luck and have fun!`
            );
          });
        }
        //Tuesday and no score case
        else if (afterMatch && !score && date.getDay() == 2) {
          matchTeams.forEach((team) => {
            sendEmail(
              team.teamCaptainEmail,
              "Enter your scores for your match",
              `You played a match last Saturday against ${
                team.TeamName === match.Team1 ? match.Team2 : match.Team1
              }. Make sure to enter your score by this Thursday or the match will be declared a tie.`
            );
          });
        }
        //Thursday and no score case
        else if (afterMatch && !score && date.getDay() == 4) {
          matchTeams.forEach((team) => {
            sendEmail(
              team.teamCaptainEmail,
              "Match scores not entered",
              `You played a match last Saturday against ${
                team.TeamName === match.Team1 ? match.Team2 : match.Team1
              } and neither of you have entered a score. The match has been declared a tie. Make sure to enter your score next time.`
            );
          });
          match.Score = "0-0";
          match.WinnerTeam = "Tie";
          matches[index] = match;
          league.findByIdAndUpdate(league._id, { Matches: matches });
        }
      });
      if (
        league.Matches.length() ==
          (league.Teams.length() * (league.Teams.length() - 1)) / 2 &&
        league.Matches.every((match) => match.WinnerTeam)
      ) {
        let teamScores = {};
        league.Matches.forEach((match) => {
          if (match.WinnerTeam == match.Team1) {
            teamScores[match.Team1] = teamScores[match.Team1]
              ? teamScores[match.Team1] + 1
              : 1;
            teamScores[match.Team2] = teamScores[match.Team2]
              ? teamScores[match.Team2]
              : 0;
          } else if (match.WinnerTeam == match.Team2) {
            teamScores[match.Team2] = teamScores[match.Team2]
              ? teamScores[match.Team2] + 1
              : 1;
            teamScores[match.Team1] = teamScores[match.Team1]
              ? teamScores[match.Team1]
              : 0;
          } else {
            teamScores[match.Team1] = teamScores[match.Team1]
              ? teamScores[match.Team1]
              : 0;
            teamScores[match.Team2] = teamScores[match.Team2]
              ? teamScores[match.Team2]
              : 0;
          }
        });
        let top2Teams = Object.entries(teamScores)
          .sort(({ 1: a }, { 1: b }) => b - a)
          .slice(0, 2);
        const nextSaturday = new Date(date.getDate() + (6 - date.getDay()) + 1);
        let finalMatch = {
          Date: nextSaturday.toDateString(),
          Team1: top2Teams[0],
          Team2: top2Teams[1],
          Score: "",
          WinnerTeam: "",
        };
        league.findByIdAndUpdate(league._id, {
          $push: { Matches: finalMatch },
        });
      }
    });
};

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

/**
 * Deletes a team from a league based on league id and team id
 * @param {*} req request object
 * @param {*} res response object
 */
export const deleteTeam = async (req, res) => {

  // Find the league specified by the request
  const league = await League.findById(req.params.leagueId)

  // Filter out the team with the matching ID
  league.Teams = league.Teams.filter(team => team._id.toString() !== req.params.teamId);

  // Update league object and make response
  await League.findByIdAndUpdate(req.params.leagueId, league)
  res.status(200).json(league);

}

/**
 * Changes a captain of a team. leagueId, teamId, and username are specified in the request
 * @param {*} req request object
 * @param {*} res response object
 */
export const updateTeamCaptain = async (req, res) => {
  // Find the league specified by the request
  const league = await League.findById(req.params.leagueId)

  // Find the team specified by the request
  const teamIndex = league.Teams.findIndex(team => team._id.toString() === req.params.teamId);

  // Update the proper team's captain
  league.Teams[teamIndex].TeamCaptain = req.params.username

  // Update league object and make response
  await League.findByIdAndUpdate(req.params.leagueId, league)
  res.status(200).json(league);
}
