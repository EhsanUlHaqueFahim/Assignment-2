
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { Notification } from "../models/notification.model.js";
import { Company } from "../models/company.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin check how many applicants have applied
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by application id with populated job and company
        const application = await Application.findById(applicationId)
            .populate('job')
            .populate('applicant');
            
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // Get company information
        const job = await Job.findById(application.job._id).populate('company');
        if(!job){
            return res.status(404).json({
                message:"Job not found.",
                success:false
            })
        }

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        // Create notification for the applicant
        let notificationTitle, notificationMessage;
        
        if(status.toLowerCase() === 'accepted') {
            notificationTitle = "Application Accepted! 🎉";
            notificationMessage = `Congratulations! Your application for "${job.title}" at ${job.company.name} has been accepted. Please visit us at our company for the next steps.`;
        } else if(status.toLowerCase() === 'rejected') {
            notificationTitle = "Application Update";
            notificationMessage = `We regret to inform you that your application for "${job.title}" at ${job.company.name} has not been selected for this position.`;
        }

        // Create notification
        await Notification.create({
            user: application.applicant._id,
            type: status.toLowerCase() === 'accepted' ? 'application_accepted' : 'application_rejected',
            title: notificationTitle,
            message: notificationMessage,
            job: job._id,
            company: job.company._id,
            application: application._id
        });

        // Remove application from job's applications array if accepted or rejected
        if(status.toLowerCase() === 'accepted' || status.toLowerCase() === 'rejected') {
            await Job.findByIdAndUpdate(
                job._id,
                { $pull: { applications: applicationId } }
            );
        }

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log('Error updating application status:', error);
        return res.status(500).json({
            message:"Internal server error",
            success:false
        });
    }
}


        