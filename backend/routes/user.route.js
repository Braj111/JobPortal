import express from 'express';
import { login, register, updateProfile, logout } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';

const router= express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout); //get because we are not sending any data, just need a response from the server
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile); //this will again check for authentication using middleware

export default router; //received by the index.js
