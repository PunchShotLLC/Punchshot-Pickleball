import express from 'express';
import { getCourts } from '../controllers/courtController.js';

const router = express.Router();

router.get('/', getCourts);

export default router;