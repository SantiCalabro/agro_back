const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const fs = require("fs");

const file = fs.readFileSync("./A06EB49BE41A9B5DA40D271B749AA0A7.txt");
require("./db.js");

const server = express();
const cors = require("cors");
var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://54.82.181.79:3001/");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(cors());

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

server.get("/.well-known/pki-validation/A06EB49BE41A9B5DA40D271B749AA0A7.txt"),
  (req, res) => {
    res.sendFile(
      "C:UsersSANTIAGODesktopDocuments\02 TrabajoProgramacionAgroalimentos e Insumos del Mercosur\backMysqlA06EB49BE41A9B5DA40D271B749AA0A7.txt"
    );
  };
module.exports = server;
