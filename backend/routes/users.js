import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
});

const filefilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

import {
  createUser,
  loginUser,
  verifyUser,
  updatePassword,
  joinTeam,
  uploadFile,
  getProfilePhoto,
} from "../controllers/userController.js";

router.post("/login", loginUser);
router.post("/signup", createUser);
router.post("/upload", upload.single("image"), uploadFile);
router.post("/verify", verifyUser);
router.post("/update", updatePassword);
router.post("/joinTeam", joinTeam);
router.get("/getPhoto/:userName", getProfilePhoto);

export default router;
