export const exportToCSV = (data) => {
  const headers = [
    "Rank",
    "Candidate",
    "Score",
    "Matched Skills",
    "Missing Skills",
  ];

  const rows = data.map((candidate) => [
  candidate.rank,
  `"${candidate.candidateName}"`,
  candidate.score,
  `"${candidate.matchedSkills.join(", ")}"`,
  `"${candidate.missingSkills.join(", ")}"`
]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob(
    [csvContent],
    { type: "text/csv;charset=utf-8;" }
  );

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);

  link.download = "candidate-rankings.csv";

  link.click();
};