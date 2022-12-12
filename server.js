"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const fileStore = require("session-file-store")(session);

const app = express()
dotenv.config();

const accessLogStream = require("./src/config/log");
const home = require("./src/routes/home");

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(session({
    httpOnly: true,
    secure: true,
    key: "loginData",
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true
    },
    store: new fileStore()
}));

app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(morgan("common", { stream: accessLogStream }));
app.use(cookieParser());

app.use("/", home);

const PORT = process.env.PORT || 5000;

app.listen(PORT);

module.exports = app;