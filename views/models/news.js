var mongoose = require("mongoose");

var NewsSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});



module.exports = mongoose.model("News" , NewsSchema);
