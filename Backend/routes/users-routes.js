const express = require("express");
const bodyParser = require("body-parser");
const { validator, check } = require("express-validator");

const userController = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", userController.getUsers);
router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.signup
);
router.post("/login", userController.login);

module.exports = router;
