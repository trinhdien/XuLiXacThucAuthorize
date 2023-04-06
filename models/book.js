var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  tieude: {
    type: String,
    required: true
  },
  tacgia: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Book", BookSchema);
