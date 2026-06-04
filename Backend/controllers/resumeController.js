const connection = require("../config/db");
const extractTextFromPDF = require("../utils/pdfParser");
const extractTextFromDOCX = require("../utils/docxParser");
const extractSkills = require("../utils/extractSkills");
const extractJDSkills =require("../utils/extractJDSkills");
const extractJDText =require("../utils/extractJDText");

const calculateScore =require("../utils/calculateScore");
const uploadResume = async (req, res) => {
  try {
    let jdText =
req.body.jobDescription || "";

if (
  req.files.jdFile &&
  req.files.jdFile.length > 0
) {
  jdText = await extractJDText(
    req.files.jdFile[0].path
  );
};

    const jdSkills = extractJDSkills(jdText);

    const candidates = [];

    for (const file of req.files.resumes)  {
      const path = require("path");

let text = "";

const ext = path
  .extname(file.originalname)
  .toLowerCase();

if (ext === ".pdf") {
  text = await extractTextFromPDF(
    file.path
  );
}
else if (ext === ".docx") {
  text = await extractTextFromDOCX(
    file.path
  );
}
      const skills = extractSkills(text);

      const result = calculateScore(
        skills,
        jdSkills
      );

      candidates.push({
  candidateName: file.originalname,
  filePath: file.filename,
  score: result.score,
  matchedSkills: result.matchedSkills,
  missingSkills: result.missingSkills,
});
      connection.query(
  `INSERT INTO candidates
  (candidate_name, score, matched_skills, missing_skills, rank_position)
  VALUES (?, ?, ?, ?, ?)`,
  [
    file.originalname,
    result.score,
    result.matchedSkills.join(", "),
    result.missingSkills.join(", "),
    0
  ],
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);
    }

    candidates.sort(
      (a, b) => b.score - a.score
    );

    candidates.forEach((candidate, index) => {
      candidate.rank = index + 1;
    });
candidates.forEach((candidate) => {
  connection.query(
    `UPDATE candidates
     SET rank_position = ?
     WHERE candidate_name = ?`,
    [
      candidate.rank,
      candidate.candidateName
    ],
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});
    res.json(candidates);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error parsing resumes",
    });
  }
};
module.exports = { uploadResume };