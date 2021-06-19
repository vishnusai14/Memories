const express = require("express")
const Router = express.Router()

Router.get("/", (req, res) => {
    res.clearCookie('SSID')
    res.redirect("/")
})

module.exports = Router