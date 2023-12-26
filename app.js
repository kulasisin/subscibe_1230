const express = require("express");
const app = express();
const Joi = require("@hapi/joi");
const movies = require("./movies");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("歡迎來到永夜安安工作室！！探險火寶現正熱映中！！1226");
});

const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Server started on Port ${port}`));
