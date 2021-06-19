require("dotenv").config()
const express = require("express")
const Router = express.Router()
const checkUser = require("../../functions/jwtcheck")
const imgModel = require("../../database/imageModel")
const secret = process.env.SECRET
Router.post("/delete", (req, res) => {
    const user = checkUser(req, secret)
    const photoId = req.body.id
    imgModel.deleteOne({ _id: photoId }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            imgModel.find({ userId: user.id }, (err, found) => {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect("/upload/show")
                }
            })
        }
    })
})

module.exports = Router