const express = require("express");
const router = express.Router();
const { userValidationRules, validate } = require("../validator/index");
const { signup, signin, signout } = require("../controllers/auth");

router.post("/signup", userValidationRules(), validate, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
