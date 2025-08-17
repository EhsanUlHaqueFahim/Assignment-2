import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Dhaka", "Barishal", "Khulna", "Chittagong", "Sylhet"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-30000", "50000-100000", "100000-500000"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-white dark:bg-gray-800 p-3 rounded-md shadow-md'>
            <h1 className='font-bold text-lg text-gray-900 dark:text-white'>Filter Jobs</h1>
            <hr className='mt-3 border-gray-200 dark:border-gray-700' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg text-gray-900 dark:text-white'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={idx} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem 
                                                value={item} 
                                                id={itemId} 
                                                className="w-4 h-4 text-[#6A38C2] border-2 border-gray-300 dark:border-gray-600 focus:ring-[#6A38C2] focus:ring-2"
                                            />
                                            <Label htmlFor={itemId} className="text-gray-700 dark:text-gray-300 cursor-pointer">{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard