import User from "../models/user.model.js";
import League from "../models/league.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createSecretToken from "../util/secretToken.js";
import dotenv from "dotenv";
dotenv.config();
import Aws from 'aws-sdk';


const s3 = new Aws.S3({
  accessKeyId:process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET
})

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

//get user with username, password
export const loginUser = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ Username });

    if (!user) {
      console.log("hi");
      return res.json({
        error: "No user found",
      });
    }
    // check password
    const match = await comparePassword(Password, user.Password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }

    // create signed token
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, user });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

// upload new profile pic to S3 bucket
// export const uploadPic = async (req, res) => {
  
// }

// create new user
export const createUser = async (req, res) => {

  const {
    Email,
    Username,
    Name,
    Sex,
    Password,
    ZipCode,
    SkillLevel,
  } = req.body;

  console.log(
    Name +
      " " +
      Sex +
      " " +
      Email +
      " " +
      Username +
      " " +
      Password +
      " " +
      SkillLevel
  );

  if (!Email) {
    return res.json({
      error: "Email is required",
    });
  }
  if (!Username) {
    return res.json({
      error: "Username is required",
    });
  }
  if (!Name) {
    return res.json({
      error: "Name is required",
    });
  }
  if (!Sex) {
    return res.json({
      error: "Sex is required",
    });
  }
  if (!Password || Password.length < 6 || Password.length > 20) {
    return res.json({
      error: "Password should be between 6 and 20 characters long",
    });
  }
  if (!ZipCode || ZipCode.length != 5) {
    return res.json({
      error: "ZipCode should be 5 characters long",
    });
  }
  if (
    !SkillLevel &&
    SkillLevel !== "Novice" &&
    SkillLevel !== "Intermediate" &&
    SkillLevel !== "Advanced"
  ) {
    return res.json({
      error: "Valid skill level is required",
    });
  }
  const existEmail = await User.findOne({ Email });
  if (existEmail) {
    return res.json({
      error: "Email already exists",
    });
  }
  const existUsername = await User.findOne({ Username });
  if (existUsername) {
    return res.json({
      error: "Username already exists",
    });
  }
  const hashedPassword = await hashPassword(Password);

  let location = ""
  if (req.file) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ACL:"public-read-write",
      ContentType:"image/jpeg"
    }
  
    const upload = await s3.upload(params, (error, data) => {
      if (error) {
        res.status(500).send({"err":error})
      }
    }).promise()

    location = upload["Location"]
  }


  try {
    const user = await new User({
      Email,
      Username,
      Password: hashedPassword,
      Name,
      Sex,
      ZipCode,
      ProfilePhoto: location,
      SkillLevel,
    }).save();

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
  } catch (error) {
    console.log(error);
  }
};

//Uploads a new profile picture for the User
export const uploadFile = async (req, res) => {
  const { Username, Location } = req.body
  const user = await User.findOne({ Username });
  
  if (!user) {
    return res.json({
      error: "No user found",
    });
  }

  let newLocation = ""
  if (req.file) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ACL:"public-read-write",
      ContentType:"image/jpeg"
    }

    const upload = await s3.upload(params, (error, data) => {
      if (error) {
        res.status(500).send({"err":error})
      }
    }).promise()

    newLocation = upload["Location"]
  }



  if (Location != "") {
    const key = Location.slice(45)
    console.log(key)

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key
    }

    const object = await s3.deleteObject(params, (error, data) => {
      if (error){
        res.status(500).send({"err":error})
      }
      console.log("success")
    }).promise()
  }

  const updateRes = await User.updateOne({ Username }, { ProfilePhoto: newLocation });
}

export const verifyUser = async (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user)
        return res.json({
          status: true,
          user: user,
        });
      else return res.json({ status: false });
    }
  });
};

// not used
export const joinTeam = async (req, res) => {
  const { leagueID, teamID, userName } = req.body;

  // find league by ID
  const league = await League.findById(leagueID);
  if (!league) {
    return res.json({
      error: "League not found",
    });
  }

  // find team by ID
  const team = league.Teams.find((team) => team._id == teamID);
  console.log(league.Teams);
  console.log(team);
  if (!team) {
    return res.json({
      error: "Team not found",
    });
  }

  // get user user name
  // const user = await User.findById(userID);
  // if (!user) {
  //   return res.json({
  //     error: "User not found",
  //   });
  // }

  const query = { _id: leagueID, "Teams._id": teamID };
  let newValues = {};

  let membersArray = team.TeamMembers;
  membersArray = membersArray.filter((value) => value !== null);
  if (membersArray.length >= 6) {
    return res.json({
      error: "Team is full",
    });
  }

  if (membersArray.length == 0) {
    newValues.set("TeamCaptain", user.Username);
  }

  membersArray.push(user.Username);
  console.log(membersArray);
  newValues["TeamMembers"] = membersArray;
  newValues = { $set: newValues };

  console.log(newValues);

  League.updateOne(query, newValues, {
    // not working
    arrayFilters: [{ "xxx._id": teamID }],
  });

  return res.status(200).json({ messsage: "User added successfully" });
};

export const deleteUser = async (req, res) => {};

export const updateContent = async (req, res) => { };

export const updatePassword = async (req, res) => {
  try {
    const { Username, OldPassword, NewPassword } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ Username });

    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    // check password
    const match = await comparePassword(OldPassword, user.Password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    if (!NewPassword || NewPassword.length < 6 || NewPassword.length > 20) {
      return res.json({
        error: "New Password should be between 6 and 20 characters long",
      });
    }
    const hashedPassword = await hashPassword(NewPassword);
    const updateRes = await User.updateOne({ Username }, { Password: hashedPassword, });
    // create signed token
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "Password changed successfully", success: true, user });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};
