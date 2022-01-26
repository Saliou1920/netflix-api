require("dotenv").config();
require("express-async-errors");

// connect to the database
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentification");

const express = require("express");
const app = express();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", authenticateUser, userRoute);

const port = process.env.PORT || 3000;

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
