import { Job } from "../models/job.model.js";
//admin job post
export const postJob= async (req, res) =>{
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,companyId} =req.body;
        const userId=req.id;

        if(!title || !description || !requirements || !salary || !location || !experience || !position || !companyId || !jobType){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        const job=await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by:userId
        });
        return res.status(201).json({
            message: "New Job created successfully",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    } 
}
//student search results
export const getAllJobs= async (req, res) => {
    try {
        const keyword =req.query.keyword || "";  // http://localhost:8000/api/v1/company/update/66e713fc6baead4a111f626a?keyword="mmmmm"
        const query = { //mongoDb $or operator
            $or:[
                {title: {$regex:keyword, $options:"i"}},
                {description: {$regex:keyword, $options:"i"}},
            ]
        } 
        //Very important segment wrt interview *********- populate() method
        const jobs=await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        
        if(!jobs){
            return res.status(404).json({
                message: "Jobs not found",
                success: false,
            });
        }
        return res.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}
//student search results
export const getJobById= async (req, res) =>{
    try {
         const jobId= req.params.id;
         const job= await Job.findById(jobId).populate({
            path:"applications", 
         });
         if(!job){
            return res.status(404).json({
                message: "Jobs not found",
                success: false,
            });
        }
        return res.status(200).json({
            job,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}
//admin posts search results through admin Id
export const getAdminJobs= async (req, res) => {
    try {
        const admiId= req.id;
        const jobs =await Job.find({created_by: admiId}).populate({
            path:'company'
        }); 
        if(!jobs){
            return res.status(404).json({
                message: "Jobs not found",
                success: false,
            });
        }
        return res.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}

