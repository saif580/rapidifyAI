import express from "express";
import { uploadResume } from "../controllers/resumeController.js";
import {attachDbToRequest} from "../middleware/attachDb.js"
const router = express.Router();

router.post("/upload", attachDbToRequest,uploadResume);

export default router;
