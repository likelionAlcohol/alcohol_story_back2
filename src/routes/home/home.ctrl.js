"use strict";

const User = require("../../models/User");

const output = {
    home: (req,res) => {
        res.render("home/index");
    },
    login_index: (req,res) => {
        res.render("home/login_index");
    },
    login: (req,res) => {
        let { user } = req.session;
        res.render("home/login", { user });
    },
    register: (req,res) => {
        res.render("home/register");
    },
    logout: (req,res) => {
        req.session.destroy();
        res.clearCookie("sid");
        res.render("home/index");
    },
    myPage: (req,res) => {
        let { user } = req.session;
        res.render("home/myPage", user);
    },
    message: (req,res) => {
        res.render("home/message");
    }
};

const process = {
    login: async(req,res) => {
        const user = new User(req.body);
        const response = await user.login();
        req.session.user = { user };
        return res.json(response);
    },
    register: async(req,res) => {
        const user = new User(req.body);
        const response = await user.register();
        req.session.user = user;
        return res.json(response);
    },
};

module.exports = {
    output,
    process,
};