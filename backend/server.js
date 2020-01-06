const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const models = require("./models");
const corsWhitelist = process.env.ALLOW_CORS;

models.sequelize
  .sync()
  .then(function() {
    console.log("Database initialization finished with success");
  })
  .catch(function(error) {
    console.error(`Something goes wrong with DB: ${error}`);
  });

app.use(bodyParser.json());
app.use(
  cors({
    origin: corsWhitelist ? corsWhitelist.split(",") : true,
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use("/api/v1", require("./routes"));
app.all("*", handleFallthrough);

module.exports = app;

function handleFallthrough(req, res) {
  return res.sendStatus(404);
}
