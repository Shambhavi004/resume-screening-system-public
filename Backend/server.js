require("dotenv").config();
const db = require("./config/db");
const express = require("express");
const cors = require("cors");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static("uploads")
);
app.use("/api/resumes", resumeRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});