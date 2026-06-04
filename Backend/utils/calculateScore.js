const calculateScore = (
  resumeSkills,
  jdSkills
) => {

  const matchedSkills =
    resumeSkills.filter((skill) =>
      jdSkills.includes(skill)
    );

  const score =
    jdSkills.length === 0
      ? 0
      : Math.round(
          (matchedSkills.length /
            jdSkills.length) *
            100
        );

  const missingSkills =
    jdSkills.filter(
      (skill) =>
        !resumeSkills.includes(skill)
    );

  return {
    score,
    matchedSkills,
    missingSkills,
  };
};

module.exports = calculateScore;