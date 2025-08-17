import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative overflow-hidden'>
            
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
            </div>
            
            <div className='relative text-center py-20 px-4'>
                <div className='flex flex-col gap-10 max-w-5xl mx-auto'>
                    <div className='space-y-6'>
                        <span className='inline-flex items-center px-6 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-700 text-[#6A38C2] font-semibold text-sm shadow-lg'>
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                            Trusted by 10,000+ Companies Worldwide
                        </span>
                        <h1 className='text-7xl font-bold leading-tight text-gray-900 dark:text-white'>
                            Your Gateway to 
                            <br />
                            <span className='bg-gradient-to-r from-[#6A38C2] via-purple-600 to-blue-600 bg-clip-text text-transparent'>
                                Career Excellence
                            </span>
                        </h1>
                        <p className='text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium'>
                            Discover opportunities that match your skills, passion, and career goals. 
                            Join thousands of professionals who found their dream jobs through WorkNest.
                        </p>
                    </div>
                    
                    <div className='flex w-full max-w-3xl shadow-2xl border border-gray-200 dark:border-gray-600 pl-8 rounded-full items-center gap-4 mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm'>
                        <input
                            type="text"
                            placeholder='Search for jobs, companies, or skills...'
                            onChange={(e) => setQuery(e.target.value)}
                            className='outline-none border-none w-full py-6 text-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                        />
                        <Button onClick={searchJobHandler} className="rounded-r-full bg-gradient-to-r from-[#6A38C2] to-purple-600 hover:from-[#5b30a6] hover:to-purple-700 px-10 py-6 shadow-lg">
                            <Search className='h-7 w-7' />
                        </Button>
                    </div>
                    
                    <div className='flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400'>
                        <span className='flex items-center gap-2'>
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            50,000+ Active Jobs
                        </span>
                        <span className='flex items-center gap-2'>
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            5,000+ Companies
                        </span>
                        <span className='flex items-center gap-2'>
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            100,000+ Success Stories
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection