import express from "express";

const router = express.Router();

import { createUser, loginUser } from "../controllers/userController.js";

router.post("/login", loginUser);
router.post("/signup", createUser);

export default router;
