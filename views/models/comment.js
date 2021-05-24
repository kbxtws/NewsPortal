var mongoode = require("mongoose");

var commentSchema = mongoose.Schema({
    text : String,
    author: {
        id: {
            type: mongoode.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    }
        //comments: [
        //    {
        //        type: mongoose.Schema.Types.ObjectId,
        //        ref: "Comment"
        //    }
  //  ]
});

module.exports = mongoose.model("Comment", commentSchema);