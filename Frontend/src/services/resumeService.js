import axios from "axios";

export const uploadResume = async (
  resumes,
  jobDescription,
  jdFile
) => {

  const formData = new FormData();

  resumes.forEach((file) => {
    formData.append("resumes", file);
  });

  formData.append(
    "jobDescription",
    jobDescription
  );

  if (jdFile) {
    formData.append(
      "jdFile",
      jdFile
    );
  }

  const response = await axios.post(
    "https://resume-screening-system-xkxq.onrender.com/api/resumes/upload",
    formData
  );

  return response.data;
};