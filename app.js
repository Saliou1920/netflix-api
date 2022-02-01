require("dotenv").config();
require("express-async-errors");

// connect to the database
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentification");

const cors = require("cors");
const express = require("express");
const app = express();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const movieRoute = require("./routes/movie");
const listRoute = require("./routes/list");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", authenticateUser, userRoute);
app.use("/api/v1/movies", authenticateUser, movieRoute);
app.use("/api/v1/lists", authenticateUser, listRoute);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

start();
