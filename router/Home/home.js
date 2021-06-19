require("dotenv").config()
const express = require("express")
const Router = express.Router()
const model = require("../../database/userModel")
const JWT = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


const secret = process.env.SECRET

Router.get("/", (req, res) => {
    res.render("home", { info: "" })
})
Router.post('/signup', async(req, res) => {
    let hashPassword = await bcrypt.hash(req.body.password, 2)
    const newUser = new model({
        email: req.body.email,
        username: req.body.username,
        password: hashPassword
    })
    model.findOne({ email: req.body.email }, (err, found) => {
        if (err) {
            console.log(err)
        } else {
            if (found) {
                res.render("home.ejs", { info: "User Exist" })
            } else {
                newUser.save((err, result) => {
                    if (err) {
                        res.render("home.ejs", { info: "SomeThig Went Wrong" })
                    } else {
                        res.render("home.ejs", { info: "User Created" })
                    }
                })
            }
        }
    })

})

Router.post("/login", (req, res) => {
    console.log("Logging In")
    let email = req.body.email
    let password = req.body.password
    model.findOne({ email: email }, (err, found) => {
        if (err) {
            console.log(err)
        } else {
            if (found) {
                console.log(found)
                if (bcrypt.compareSync(password, found.password)) {
                    let payload = { id: found._id }
                    let token = JWT.sign(payload, secret)
                    res.cookie("SSID", token)
                    res.redirect("/upload")
                } else {
                    res.render("home", { info: "Check Your UserName Or Password" })
                }

            } else {
                res.render("home", { info: "No User Found" })
            }

        }
    })
})



module.exports = Router