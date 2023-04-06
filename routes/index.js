var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "StoreBooks" });
});
router.get("/signup", function (req, res, next) {
  res.render("rigister", { title: "Register" });
});
router.get("/signin", function (req, res, next) {
  res.render("login", { title: "Login" });
});
router.get("/home", function (req, res, next) {
  res.render("home", { title: "StoreBooks" });
});
router.post("/addBook", (req, res, next) => {
  res.render("addBook", { title: "Add Book" });
});
module.exports = router;
