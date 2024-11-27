import fs from "fs";
import {dirname,join} from "path";
import { ResumeModel } from "../models/resumeModel.js";
import { ParsedDataModel } from "../models/parsedDataModel.js";
import { AttributeModel } from "../models/attributeModel.js";
import multer from "multer";
import { parseResume } from "../utils/resumeParser.js";


const upload = multer({
  dest: "uploads/",
});

export const uploadResume = async (req, res) => {
  try {
    upload.single("resume")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: "File upload failed" });
      }
      // console.log(req.db)
      const __dirname = dirname(req.body.filename);
      // console.log(__dirname,"--yaha");
      const filePath = join(__dirname, "/uploads", req.body.filename);
      const resume = await ResumeModel(req.db).create({
        user_id: req.body.user_id,
        file_path: filePath,
        status: "uploaded",
      });

      const parsedData = await parseResume(filePath); 

      const parsedRecord = await ParsedDataModel(req.db).create({
        resume_id: resume.id,
        full_name: parsedData.fullName,
        email: parsedData.email,
        phone: parsedData.phone,
        experience_years: parsedData.experienceYears,
        education_level: parsedData.educationLevel,
        summary: parsedData.summary,
      });

      // Save skills and keywords in the attributes table
      const attributes = parsedData.skills.concat(parsedData.keywords).map((value) => ({
        resume_id: resume.id,
        type: parsedData.skills.includes(value) ? "skill" : "keyword",
        value,
      }));

      await AttributeModel(req.db).bulkCreate(attributes);

      res.status(201).json({
        message: "Resume uploaded and processed successfully",
        resume,
        parsedData: parsedRecord,
      });
    });
  } catch (error) {
    console.error("Error processing resume:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
