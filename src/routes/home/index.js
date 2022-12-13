"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login_index", ctrl.output.login_index);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/logout", ctrl.output.logout);
router.get("/myPage", ctrl.output.myPage);
router.get("/message", ctrl.output.message);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

module.exports = router;