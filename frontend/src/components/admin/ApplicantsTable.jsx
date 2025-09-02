import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { setAllApplicants } from '@/redux/applicationSlice';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const dispatch = useDispatch();

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
                
                // Remove the application from the applicants list since it's been processed
                if (applicants && applicants.applications) {
                    const updatedApplications = applicants.applications.filter(app => app._id !== id);
                    dispatch(setAllApplicants({
                        ...applicants,
                        applications: updatedApplications
                    }));
                }
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Table>
                <TableCaption className="text-gray-600 dark:text-gray-400">A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-900 dark:text-white">FullName</TableHead>
                        <TableHead className="text-gray-900 dark:text-white">Email</TableHead>
                        <TableHead className="text-gray-900 dark:text-white">Contact</TableHead>
                        <TableHead className="text-gray-900 dark:text-white">Resume</TableHead>
                        <TableHead className="text-gray-900 dark:text-white">Date</TableHead>
                        <TableHead className="text-right text-gray-900 dark:text-white">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell className="text-gray-700 dark:text-gray-300">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="text-gray-700 dark:text-gray-300">{item?.applicant?.email}</TableCell>
                                <TableCell className="text-gray-700 dark:text-gray-300">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 dark:text-blue-400 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span className="text-gray-500 dark:text-gray-400">NA</span>
                                    }
                                </TableCell>
                                <TableCell className="text-gray-700 dark:text-gray-300">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 dark:bg-gray-700 dark:border-gray-600">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable