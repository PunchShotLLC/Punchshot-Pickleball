import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    user.Password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

// create new user
export const createUser = async (req, res) => {
  const {
    Email,
    Username,
    FirstName,
    LastName,
    Password,
    ZipCode,
    SkillLevel,
  } = req.body;

  console.log(
    FirstName +
      " " +
      LastName +
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
  if (!FirstName) {
    return res.json({
      error: "First Name is required",
    });
  }
  if (!LastName) {
    return res.json({
      error: "First Name is required",
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
  try {
    const user = await new User({
      Email,
      Username,
      Password: hashedPassword,
      FirstName,
      LastName,
      ZipCode,
      SkillLevel,
    }).save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    const { password, ...rest } = user._doc;
    return res.json({
      token,
      user: rest,
    });
  } catch (error) {
    console.log(error);
  }
  // }
};

export const joinLeague = async (req, rest) => {};

export const deleteUser = async (req, res) => {};

export const updateContent = async (req, res) => {};
