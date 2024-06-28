const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
db();

const corsOptions = {
  origin: "https://pro-manage-sable.vercel.app",
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/healthCheck", (req, res) => {
  console.log(" at the healthcheck api endpoint");
  res.json({
    service: "Quiz app server",
    status: "active",
    time: new Date().getTime(),
  });
});

app.use("/api/user", require("./routes/userRoute"));
app.use("/api/tasks", require("./routes/tasksRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
