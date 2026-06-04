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

const extractJDSkills = (jdText) => {
  const lowerText = jdText.toLowerCase();

  return skillsList.filter((skill) =>
    lowerText.includes(skill.toLowerCase())
  );
};

module.exports = extractJDSkills;