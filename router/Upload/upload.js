require("dotenv").config()
const express = require("express")
const Router = express()
const model = require("../../database/userModel")
const imgModel = require("../../database/imageModel")
const checkUser = require("../../functions/jwtcheck")
const secret = process.env.SECRET
Router.get('/', (req, res) => {
    const user = checkUser(req, secret)
    if (user) {
        model.findOne({ _id: user.id }, (err, found) => {
            if (err) {
                console.log(err)
            } else {
                if (found) {
                    res.render("upload")
                } else {
                    res.redirect("/")
                }
            }
        })
    } else {
        res.redirect("/")
    }

})

Router.post("/add", (req, res) => {
    const user = checkUser(req, secret)
    const comment = req.body.comment
    const id = user.id
    const image = req.body.img
    const newImage = new imgModel({
        comment: comment,
        userId: id
    })
    saveImage(newImage, image)
    newImage.save((err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/upload")
        }
    })
})


Router.get("/show", (req, res) => {
    const user = checkUser(req, secret)

    imgModel.find({ userId: user.id }, (err, found) => {
        if (err) {
            console.log(err)
        } else {
            res.render("photos", { models: found })
        }
    })
})



const saveImage = (model, image) => {
    if (image) {
        imageParse = JSON.parse(image)
        if (imageParse !== null && imageParse.type !== null) {
            model.img = new Buffer.from(imageParse.data, 'base64')
            model.imgType = imageParse.type
        }
    } else {
        model.img = null
        model.imgType = null
    }
}

module.exports = Router