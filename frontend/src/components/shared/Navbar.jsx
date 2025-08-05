import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Sun, Moon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user, loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // On mount, check localStorage or system preference
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setDarkMode(true);
        }
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Work<span className='text-[#6A38C2]'>Nest</span></h1>
                </div>
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        <li><Link to="/" className="hover:text-[#6A38C2] transition-colors">Home</Link></li>
                        {user && user.role === 'recruiter' && (
                            <li><Link to="/companies" className="hover:text-[#6A38C2] transition-colors">Companies</Link></li>
                        )}
                        <li><Link to="/jobs" className="hover:text-[#6A38C2] transition-colors">Jobs</Link></li>
                        {user && (
                            <li><Link to="/profile" className="hover:text-[#6A38C2] transition-colors">Profile</Link></li>
                        )}
                    </ul>
                    <Button variant="ghost" onClick={toggleDarkMode} aria-label="Toggle dark mode" className="p-2">
                        {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />}
                    </Button>
                    {
                        loading ? (
                            <div className='flex items-center gap-3'>
                                <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                                <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                            </div>
                        ) : !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button className="bg-[#6A38C2] text-white hover:bg-[#5b30a6] shadow-md">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] shadow-md">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className='flex items-center gap-3'>
                                <span className='text-sm text-gray-600 dark:text-gray-200'>Welcome, {user?.fullname}</span>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer border-2 border-gray-200 hover:border-[#6A38C2] transition-colors">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            {!user?.profile?.profilePhoto && (
                                                <div className="w-full h-full bg-[#6A38C2] flex items-center justify-center text-white font-semibold">
                                                    {user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>
                                            )}
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                                        <div className='p-4'>
                                            <div className='flex gap-3 items-center mb-4'>
                                                <Avatar className="cursor-pointer h-12 w-12">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-semibold text-gray-800 dark:text-gray-100'>{user?.fullname}</h4>
                                                    <p className='text-sm text-gray-500 dark:text-gray-300'>{user?.profile?.bio || 'No bio available'}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col space-y-2 text-gray-600 dark:text-gray-200'>
                                                <Link to="/profile">
                                                    <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors'>
                                                        <User2 className="h-4 w-4" />
                                                        <span className="font-medium">View Profile</span>
                                                    </div>
                                                </Link>
                                                <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors' onClick={logoutHandler}>
                                                    <LogOut className="h-4 w-4" />
                                                    <span className="font-medium text-red-600 hover:text-red-700">Logout</span>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar