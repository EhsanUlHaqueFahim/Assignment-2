import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import axios from 'axios';
import { JOB_API_END_POINT, COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [jobInput, setJobInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: ""
    });
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    // Always fetch jobs using the hook
    useGetAllJobs();

    useEffect(() => {
        // Fetch companies for recruiter
        const fetchCompanies = async () => {
            if (user?.role === 'recruiter') {
                try {
                    const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                    setCompanies(res.data.companies || []);
                } catch (err) {
                    setCompanies([]);
                }
            }
        };
        fetchCompanies();
    }, [user]);

    const handleJobInputChange = (e) => {
        setJobInput({ ...jobInput, [e.target.name]: e.target.value });
    };

    const handlePostJob = async (e) => {
        e.preventDefault();
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = jobInput;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return toast.error("All fields are required");
        }
        setLoading(true);
        try {
            const payload = {
                ...jobInput,
                salary: Number(salary),
                experience: Number(experience),
                position: Number(position)
            };
            const res = await axios.post(
                `${JOB_API_END_POINT}/post`,
                payload,
                { withCredentials: true }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                setJobInput({
                    title: "",
                    description: "",
                    requirements: "",
                    salary: "",
                    location: "",
                    jobType: "",
                    experience: "",
                    position: "",
                    companyId: ""
                });
                // Refetch jobs after posting
                useGetAllJobs();
            } else {
                toast.error(res.data.message || "Failed to post job");
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to post job");
        } finally {
            setLoading(false);
        }
    };

    // Filtering jobs by search query (if needed)
    const filterJobs = allJobs.filter((job) => {
        if (!searchedQuery) return true;
        const q = searchedQuery.toLowerCase();
        return (
            job.title.toLowerCase().includes(q) ||
            job.description.toLowerCase().includes(q) ||
            job.location.toLowerCase().includes(q)
        );
    });

    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />
            {user?.role === 'recruiter' && (
                <div className='max-w-3xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded shadow'>
                    <h2 className='text-2xl font-bold mb-4'>Post a Job</h2>
                    {companies.length === 0 ? (
                        <div className="text-red-600 dark:text-red-400 font-semibold mb-4">You must create a company before posting a job.</div>
                    ) : null}
                    <form onSubmit={handlePostJob}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" value={jobInput.title} onChange={handleJobInputChange} placeholder="Job title" />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input id="description" name="description" value={jobInput.description} onChange={handleJobInputChange} placeholder="Job description" />
                            </div>
                            <div>
                                <Label htmlFor="requirements">Requirements (comma separated)</Label>
                                <Input id="requirements" name="requirements" value={jobInput.requirements} onChange={handleJobInputChange} placeholder="e.g. React, Node.js" />
                            </div>
                            <div>
                                <Label htmlFor="salary">Salary</Label>
                                <Input id="salary" name="salary" value={jobInput.salary} onChange={handleJobInputChange} placeholder="e.g. 50000" type="number" />
                            </div>
                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" value={jobInput.location} onChange={handleJobInputChange} placeholder="e.g. Dhaka" />
                            </div>
                            <div>
                                <Label htmlFor="jobType">Job Type</Label>
                                <Input id="jobType" name="jobType" value={jobInput.jobType} onChange={handleJobInputChange} placeholder="e.g. Full Time" />
                            </div>
                            <div>
                                <Label htmlFor="experience">Experience (years)</Label>
                                <Input id="experience" name="experience" value={jobInput.experience} onChange={handleJobInputChange} placeholder="e.g. 2" type="number" />
                            </div>
                            <div>
                                <Label htmlFor="position">Position (number of openings)</Label>
                                <Input id="position" name="position" value={jobInput.position} onChange={handleJobInputChange} placeholder="e.g. 3" type="number" />
                            </div>
                            <div className="md:col-span-2">
                                <Label htmlFor="companyId">Company</Label>
                                <select id="companyId" name="companyId" value={jobInput.companyId} onChange={handleJobInputChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-white" disabled={companies.length === 0}>
                                    <option value="">Select your company</option>
                                    {companies.map(company => (
                                        <option key={company._id} value={company._id}>{company.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <Button type="submit" disabled={loading || companies.length === 0} className="bg-purple-600 text-white w-full mt-4">Post Job</Button>
                    </form>
                </div>
            )}
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex flex-col gap-5'>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <div key={job?._id} className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                                                <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                                                <p className="text-gray-700 dark:text-gray-300 mb-1">{job.description}</p>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">Location: {job.location}</p>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">Salary: {job.salary}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs