import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
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
        <div className='bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <h1 className='text-2xl font-bold'>Work<span className='text-[#6A38C2]'>Nest</span></h1>
                </div>
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-[#6A38C2] transition-colors">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-[#6A38C2] transition-colors">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="hover:text-[#6A38C2] transition-colors">Home</Link></li>
                                    <li><Link to="/jobs" className="hover:text-[#6A38C2] transition-colors">Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-[#6A38C2] transition-colors">Browse</Link></li>
                                    {user && user.role === 'student' && (
                                        <li><Link to="/profile" className="hover:text-[#6A38C2] transition-colors">Profile</Link></li>
                                    )}
                                </>
                            )
                        }


                    </ul>
                    {
                        loading ? (
                            <div className='flex items-center gap-3'>
                                <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                                <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                            </div>
                        ) : !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login"><Button variant="outline" className="hover:bg-gray-50">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] shadow-md">Signup</Button></Link>
                            </div>
                        ) : (
                            <div className='flex items-center gap-3'>
                                <span className='text-sm text-gray-600'>Welcome, {user?.fullname}</span>
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
                                <PopoverContent className="w-80 shadow-lg border border-gray-200">
                                    <div className='p-4'>
                                        <div className='flex gap-3 items-center mb-4'>
                                            <Avatar className="cursor-pointer h-12 w-12">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-semibold text-gray-800'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-500'>{user?.profile?.bio || 'No bio available'}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col space-y-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Link to="/profile">
                                                        <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors'>
                                                            <User2 className="h-4 w-4" />
                                                            <span className="font-medium">View Profile</span>
                                                        </div>
                                                    </Link>
                                                )
                                            }

                                            <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors' onClick={logoutHandler}>
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