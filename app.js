require("dotenv").config();
require("express-async-errors");

const express = require("express");

// connect to the database
const connectDB = require("./db/connect");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

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
