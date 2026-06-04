import { useState } from "react";
import { uploadResume } from "../services/resumeService";
import { exportToCSV } from "../utils/exportCSV";

function UploadForm() {
  const [resumes, setResumes] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [jdFile, setJdFile] = useState(null);

  const handleAnalyze = async () => {
    if (resumes.length === 0) {
      alert("Please select at least one resume");
      return;
    }

    try {
      const data = await uploadResume(
        resumes,
        jobDescription,
        jdFile
      );

      setResult(data);
      alert("Upload Successful");
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div
        className="text-white py-5 mb-4"
        style={{
          background:
            "linear-gradient(135deg, #0f172a, #2563eb)",
        }}
      >
        <h1 className="text-center fw-bold">
          Resume Screening & Candidate Ranking System
        </h1>
      </div>

      <div className="container">

        <div className="card shadow-lg mb-4">
          <div className="card-body">

            <div className="bg-light p-4 rounded mb-4">
              <h4 className="mb-3">
                Resume Upload
              </h4>

              <input
                className="form-control"
                type="file"
                multiple
                accept=".pdf,.docx"
                onChange={(e) =>
                  setResumes(
                    Array.from(e.target.files)
                  )
                }
              />

              <div className="mt-3">
                <h6>Selected Files</h6>

                {resumes.length === 0 ? (
                  <p>No files selected</p>
                ) : (
                  resumes.map((file, index) => (
                    <p key={index}>
                      {file.name}
                    </p>
                  ))
                )}
              </div>
            </div>

            <div className="bg-light p-4 rounded">
              <h4 className="mb-3">
                Job Description
              </h4>

              <label className="form-label">
                Upload JD PDF
              </label>

              <input
                className="form-control"
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setJdFile(e.target.files[0])
                }
              />

              <div className="mt-3">
                <label className="form-label">
                  Or Enter Job Description
                </label>

                <textarea
                  className="form-control"
                  rows="6"
                  placeholder="Enter Job Description..."
                  value={jobDescription}
                  onChange={(e) =>
                    setJobDescription(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <button
              className="btn btn-success fw-bold w-100 mt-4"
              onClick={handleAnalyze}
            >
              Analyze Resumes
            </button>

          </div>
        </div>

        {result && (
          <div
            className="card shadow-lg mt-4"
            style={{
              borderRadius: "15px",
            }}
          >
            <div className="card-body">

              <h2 className="mb-4">
                Results Dashboard
              </h2>

              <input
                className="form-control mb-3"
                type="text"
                placeholder="Search Candidate..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
              />

              <div className="d-flex gap-2 mb-3">

                <button
                  className="btn btn-outline-secondary fw-bold"
                  onClick={() =>
                    setSortOrder(
                      sortOrder === "desc"
                        ? "asc"
                        : "desc"
                    )
                  }
                >
                  Sort Score
                </button>

                <button
                  className="btn btn-success fw-bold"
                  onClick={() =>
                    exportToCSV(result)
                  }
                >
                  Export CSV
                </button>

              </div>

              <div className="table-responsive">
                <table className="table table-hover table-bordered">

                  <thead className="table-dark">
                    <tr>
                      <th>Rank</th>
                      <th>Candidate</th>
                      <th>Resume</th>
                      <th>Score</th>
                      <th>Matching Skills</th>
                      <th>Missing Skills</th>
                    </tr>
                  </thead>

                  <tbody>
                    {result
                      .filter((candidate) =>
                        candidate.candidateName
                          .toLowerCase()
                          .includes(
                            searchTerm.toLowerCase()
                          )
                      )
                      .sort((a, b) =>
                        sortOrder === "desc"
                          ? b.score - a.score
                          : a.score - b.score
                      )
                      .map((candidate, index) => (
                        <tr key={index}>
                          <td>{candidate.rank}</td>

                          <td>
                            {candidate.candidateName}
                          </td>

                          <td>
                            <a
                              className="btn btn-sm btn-outline-primary"
                              href={`https://resume-screening-system-xkxq.onrender.com/uploads/${candidate.filePath}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View Resume
                            </a>
                          </td>

                          <td>
                            <strong>
                              {candidate.score}
                            </strong>
                          </td>

                          <td>
                            {candidate.matchedSkills.join(
                              ", "
                            )}
                          </td>

                          <td>
                            {candidate.missingSkills.join(
                              ", "
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>

                </table>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadForm;