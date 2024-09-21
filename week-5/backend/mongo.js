const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://devmalik2211:debu123@cluster0.smnwwnf.mongodb.net/card")

const cardSchema = mongoose.Schema({
    name: String,
    description: String,
    interests: [String],
    handles: {
        linkedin: String,
        insta:  String
    }
})

const card = mongoose.model('card', cardSchema);

module.exports = {
    card
}