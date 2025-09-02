import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'


const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const hasResume = user?.profile?.resume && user?.profile?.resumeOriginalName;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl my-5 p-8 shadow-lg'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                            {!user?.profile?.profilePhoto && (
                                <div className="w-full h-full bg-[#6A38C2] flex items-center justify-center text-white font-semibold text-2xl">
                                    {user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                            )}
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl text-gray-900 dark:text-white'>{user?.fullname}</h1>
                            <p className="text-gray-600 dark:text-gray-300">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2 text-gray-700 dark:text-gray-300'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2 text-gray-700 dark:text-gray-300'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className="text-gray-900 dark:text-white">Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span className="text-gray-500 dark:text-gray-400">NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold text-gray-900 dark:text-white">Resume</Label>
                    {
                        hasResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span className="text-gray-500 dark:text-gray-400">No resume uploaded</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg'>
                <h1 className='font-bold text-lg my-5 text-gray-900 dark:text-white px-8 pt-8'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile