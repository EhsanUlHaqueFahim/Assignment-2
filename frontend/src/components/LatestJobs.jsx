import React from 'react'
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom'; 

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    const navigate = useNavigate();
   
    return (
        <div className='py-20 bg-white dark:bg-gray-900 transition-colors duration-300'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className="text-center mb-16">
                    <h2 className='text-5xl font-bold mb-6 text-gray-900 dark:text-white'>
                        <span className='text-[#6A38C2]'>Featured</span> Job Opportunities
                    </h2>
                    <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
                        Discover the most exciting job openings from top companies. 
                        These positions are handpicked for their growth potential and excellent benefits.
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {
                        allJobs.length <= 0 ? (
                            <div className="col-span-full text-center py-12">
                                <div className="text-gray-400 text-lg mb-4">No jobs available at the moment</div>
                                <p className="text-gray-500 dark:text-gray-300">Check back soon for new opportunities!</p>
                            </div>
                        ) : (
                            allJobs?.slice(0, 6).map((job) => (
                                <div key={job._id} className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                                    <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-1">{job.description}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Location: {job.location}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Salary: {job.salary}</p>
                                </div>
                            ))
                        )
                    }
                </div>
                <div className="text-center mt-12">
                    <Button 
                        onClick={() => navigate("/jobs")}
                        className="bg-gradient-to-r from-[#6A38C2] to-purple-600 hover:from-[#5b30a6] hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium"
                    >
                        View All Jobs
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LatestJobs