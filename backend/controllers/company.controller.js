import { request } from "express";
import {Company} from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany= async (req, res) => {
    try {
        const {companyName}=req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company not found",
                success: false
            });
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"Company already exists",
                success: false
            });
        }
        company= await Company.create({
            name: companyName,
            userId: req.id //req.id indicates user id of who is creating the company 
        });

        return res.status(200).json({
            message:"company registered successfully ",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getCompany= async (req, res) => {
    try {
        const userId = req.id; //logged in user id
        const companies= await Company.find({ userId }); //return array of company list created by the current logged in user
        if(companies.length === 0) {
           return res.status(404).json({
            message: "Company not found",
            success:false
           });
        }
        return res.status(200).json({
            companies,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}

//get company by ID
export const getCompanyByID = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.error(error);
    }
}

export const updateCompany = async (req, res) => {
    try {
        const {name, description, website, location}= req.body;
        const file= req.file; //for logo
        //cloudinary
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);


        const logo=cloudResponse.secure_url;

        const updateData={name, description, website, location, logo };
        const company= await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});
        if(!company) {
            return res.status(404).json({
             message: "Company not found",
             success:false
            });
         }
         return res.status(200).json({
            message: "Company info updated",
            success: true
         });
    } catch (error) { 
        console.error(error);
    }
}