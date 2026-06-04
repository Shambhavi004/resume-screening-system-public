const skillsList = [
  "java",
  "javascript",
  "react",
  "node.js",
  "express",
  "mongodb",
  "mysql",
  "postgresql",
  "html",
  "css",
  "tailwind",
  "git",
  "github",
  "python",
  "c++",
  "aws",
];

const extractSkills = (text) => {
  const lowerText = text.toLowerCase();

  const foundSkills = skillsList.filter((skill) =>
    lowerText.includes(skill.toLowerCase())
  );

  return foundSkills;
};

module.exports = extractSkills;