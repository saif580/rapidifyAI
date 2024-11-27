import fs from "fs";
// import pdfParse from "pdf-parse";

export const parseResume = async (filePath) => {
  try {
    

  // const dataBuffer = fs.readFileSync(filePath);
  // const parsedPdf = await pdfParse(dataBuffer);

  // console.log(parsedPdf);
  return {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    experienceYears: 5,
    educationLevel: "Bachelor's Degree",
    summary: "Experienced software engineer specializing in backend development.",
    skills: ["Node.js", "PostgreSQL", "Express.js"],
    keywords: ["Backend Developer", "Team Player"],
  };
} catch (error) {
    console.error(`Error in parse resume util function`,error)
}
};
