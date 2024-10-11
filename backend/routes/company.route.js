import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getCompany, getCompanyByID, registerCompany, updateCompany } from '../controllers/company.controller.js';
import { singleUpload } from '../middlewares/multer.js';

const router= express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyByID); 
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany); //"put" method used for update

export default router; //received by the index.js
