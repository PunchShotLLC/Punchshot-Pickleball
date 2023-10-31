import express from "express";

const router = express.Router();

import { createUser, loginUser, verifyUser, joinTeam} from "../controllers/userController.js";

router.post("/login", loginUser);
router.post("/signup", createUser);
router.post("/verify", verifyUser); 
router.post("/joinTeam", joinTeam); 

export default router;
