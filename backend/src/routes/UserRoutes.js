import express from 'express';
const router = express.Router();
const validate = require("../middlewares/validator.js")
const AuthValidator = require("../middlewares/Validators/AuthValidator.js")
const UserController = require("../controllers/UserController.js")

router.post("/sign-up", validate(AuthValidator.signUpValidation), UserController.signUp);

router.post("/login", () => { });

router.get("/get-profile", () => { });

export default router;