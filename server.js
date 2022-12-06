"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express()
dotenv.config();

const accessLogStream = require("./src/config/log");
const home = require("./src/routes/home");

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(morgan("common", { stream: accessLogStream }));

app.use("/", home);

const PORT = process.env.PORT || 5000;

app.listen(PORT);

module.exports = app;