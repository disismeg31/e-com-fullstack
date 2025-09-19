const CONSTANTS = require('./../shared/constants.js');
const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authentication.controller.js')

// registeration route - for adding users
router.route(CONSTANTS.subURLS.auth.signUp).post(authController.signUp);
 
// login route - for checking if credentials are correct
router.route(CONSTANTS.subURLS.auth.signIn).post(authController.signIn);

router.route(CONSTANTS.subURLS.auth.getUsers).get(authController.getAllUsers);

// // logout route 
router.route(CONSTANTS.subURLS.auth.signOut).patch(authController.signOut);

// i dont think i need route for logout because we're deleteing the cookis from frontend thats all no backend 

module.exports = router;