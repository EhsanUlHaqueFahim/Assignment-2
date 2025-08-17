import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom'; 



const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    const navigate = useNavigate();
   
    return (
        <div className='py-20 bg-white dark:bg-gray-800'>
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
                                <div className="text-gray-400 dark:text-gray-500 text-lg mb-4">No jobs available at the moment</div>
                                <p className="text-gray-500 dark:text-gray-400">Check back soon for new opportunities!</p>
                            </div>
                        ) : (
                            allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job}/>)
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