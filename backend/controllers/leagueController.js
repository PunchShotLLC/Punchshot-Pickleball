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
  } = req.body;

  if (!LeagueName) {
    return res.json({
      error: "LeagueName is required",
    });
  }
  if (!LeagueOwner) {
    return res.json({
      error: "LeagueOwner is required",
    });
  }
  if (!NumTeams) {
    return res.json({
      error: "Number of Teams is required",
    });
  }

  if (!ZipCodes || ZipCodes.some((e) => e.length !== 5)) {
    return res.json({
      error: "Valid zip code is required",
    });
  }
  if (!City) {
    return res.json({
      error: "City is required",
    });
  }

  if (!StartDate) {
    return res.json({
      error: "Start Date is required",
    });
  }

  const existUsername = await User.findOne({ LeagueOwner });
  if (!existUsername) {
    return res.json({
      error: "League owner does not exist",
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
    }).save();

    return res.json({ league });
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

export const startLeague = async (req, res) => {
  // Change the status of the league to ongoing
  await League.findByIdAndUpdate(req.params.id, { Status: "ONGOING" })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });

  // Get the list of teams and their captains
  let league = await League.findById(req.params.id);
  let teams = league["Teams"];
  console.log(teams);

  // Send an email to the captains of each team
  for (let i = 0; i < teams.length; i++) {
    sendEmail(
      teams[i]["CaptainEmail"],
      `Your league, ${league["LeagueName"]}, has begun`,
      `Your league, ${league["LeagueName"]}, has begun`
    );
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
