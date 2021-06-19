const mongoose = require('mongoose')



const Schema = mongoose.Schema

const imgSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    img: {
        type: Buffer
    },
    imgType: {
        type: String
    },
    comment: {
        type: String
    }
})

imgSchema.set("toObject", { virtuals: true })
imgSchema.set("toJSON", { virtuals: true })

imgSchema.virtual("imgSrc").get(function() {
    if (this.img !== null && this.imgType !== null) {
        return `data:${this.imgType};base64,${this.img.toString('base64')}`
    }
})

const imgModel = mongoose.model("images", imgSchema)

module.exports = imgModel