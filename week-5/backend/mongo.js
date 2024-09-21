const mongoose = require("mongoose")
const URI = require("./uri.js")
mongoose.connect(URI)

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