import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4'>
                <form onSubmit={submitHandler} className='w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl p-8 my-10'>
                    <h1 className='font-bold text-3xl mb-6 text-center text-gray-800 dark:text-white'>Join WorkNest</h1>
                    <div className='my-2'>
                        <Label className="dark:text-gray-200">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder=""
                            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="dark:text-gray-200">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder=""
                            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="dark:text-gray-200">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder=""
                            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="dark:text-gray-200">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder=""
                            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className='space-y-4'>
                        <div className='flex items-center justify-center'>
                            <RadioGroup className="flex items-center gap-6 my-4">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="r1" className="text-sm font-medium dark:text-gray-200">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="r2" className="text-sm font-medium dark:text-gray-200">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Label className="text-sm font-medium dark:text-gray-200">Profile Photo</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3">Create Account</Button>
                    }
                    <div className='text-center mt-6'>
                        <span className='text-sm text-gray-600 dark:text-gray-300'>Already have an account? <Link to="/login" className='text-purple-600 dark:text-purple-400 font-medium hover:underline'>Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup