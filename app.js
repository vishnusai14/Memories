require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }))
app.set('view engine', 'ejs')
app.use(express.static("public"))


let uri = `mongodb+srv://Vishnu_Sai:${process.env.DBPASS}@cluster0.hkghe.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect("mongodb://localhost:27017/photomemories", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})

app.use("/", require("./router/Home/home"))
app.use("/upload", require("./router/Upload/upload"))
app.use("/logout", require("./router/Logout/logout"))
app.use("/photos", require("./router/Photos/photos"))
app.listen(9000, () => {
    console.log("Server Started")
})