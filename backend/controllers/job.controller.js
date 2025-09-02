import { Job } from "../models/job.model.js";




export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// For student
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        console.log('Backend received keyword:', keyword);
        
        // If no keyword provided, return all jobs
        if (!keyword.trim()) {
            console.log('No keyword provided, returning all jobs');
            const jobs = await Job.find({}).populate({
                path: "company"
            }).sort({ createdAt: -1 });
            console.log('Found', jobs.length, 'jobs');
            return res.status(200).json({
                jobs,
                success: true
            });
        }
        
        // If keyword provided, search for matching jobs
        console.log('Searching for keyword:', keyword);
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } }
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        console.log('Found', jobs.length, 'matching jobs for keyword:', keyword);
        
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log('Error in getAllJobs:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// created job amount
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}