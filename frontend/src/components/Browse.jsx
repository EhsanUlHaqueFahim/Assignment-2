import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';



const Browse = () => {
    useGetAllJobs();
    const {allJobs, searchedQuery} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                
                if (searchedQuery.includes('-') && searchedQuery.includes('000')) {
                    const [minSalary, maxSalary] = searchedQuery.split('-').map(s => parseInt(s));
                    return job.salary >= minSalary && job.salary <= maxSalary;
                }
                
                
                if (["Dhaka", "Barishal", "Khulna", "Chittagong", "Sylhet"].includes(searchedQuery)) {
                    return job.location.toLowerCase().includes(searchedQuery.toLowerCase());
                }
                
                
                if (["Frontend Developer", "Backend Developer", "FullStack Developer"].includes(searchedQuery)) {
                    return job.title.toLowerCase().includes(searchedQuery.toLowerCase());
                }
                
                
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({filterJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        filterJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse