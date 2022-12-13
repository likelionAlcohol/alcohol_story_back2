"use strict";

const express = require('express');
const http = require("http");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const socket = require("socket.io");

const app = express()
const server = http.createServer(app)
const io = socket(server);
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

io.sockets.on('connection', function(socket) {
    socket.on('newUser', function(name) {
      console.log(name + ' 님이 접속하였습니다.')
      socket.name = name
      io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.'})
    })
    socket.on('message', function(data) {
      data.name = socket.name
      console.log(data)
      socket.broadcast.emit('update', data);
    })
    socket.on('disconnect', function() {
      console.log(socket.name + '님이 나가셨습니다.')
      socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.'});
    })
  })

const PORT = process.env.PORT || 5000;

app.listen(PORT);

module.exports = app;