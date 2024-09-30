import express from "express";
import { shareJPG } from "../Controller/shareJPGController.js";
const router = express.Router();

router.post('/upload-certificate', shareJPG)

export default router;
