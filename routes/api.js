var passport = require("passport");
var config = require("../config/database");
require("../config/passport")(passport);
var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
var User = require("../models/user");
var Book = require("../models/book");
const session = require("express-session");
const bodyParser = require("body-parser");

// // parse requests of content-type - application/json
router.use(bodyParser.json());

const parser = bodyParser.urlencoded({ extended: true });

router.use(parser);
router.use(
  session({
    secret: "dientcph27512",
    resave: false,
    saveUninitialized: false,
  })
);
router.post("/signup", async function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: "Please pass username and password." });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    // save the user
    await newUser.save();

    res.json({ success: true, msg: "Successful created new user." });
  }
});

router.post("/signin", async function (req, res) {
  console.log(req.body);

  let user = await User.findOne({ username: req.body.username });

  console.log(user);

  if (!user) {
    res
      .status(401)
      .send({ success: false, msg: "Authentication failed. User not found." });
  } else {
    // check if password matches
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (isMatch && !err) {
        // if user is found and password is right create a token
        var token = jwt.sign(user.toJSON(), config.secret);
        // return the information including token as JSON
        console.log({ success: true, token: "JWT " + token });
        req.session.token = "JWT " + token;
        // console.log(req.session.token);
        res.redirect("/home");
        // res.json({ success: true, token: 'JWT ' + token });
      } else {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. Wrong password.",
        });
      }
    });
  }
});

router.post("/book", async (req, res) => {
  var token = req.session.token;
  if (token) {
    console.log(req.body);
    var newBook = new Book({
      tieude: req.body.tieude,
      tacgia: req.body.tacgia,
    });
    await newBook.save();
    res.json({ success: true, msg: "Successful created new book." });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

router.get("/book", async (req, res) => {
  var token = req.session.token;
  console.log(token);
  if (token) {
    let listBooks = await Book.find();
    // res.send(books);
    console.log(listBooks);
    res.render("listBook", { books: listBooks, title: "List Books" });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

getToken = function (req) {
  if (req && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
