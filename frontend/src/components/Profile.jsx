import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';

const Profile = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    password: '',
    file: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setInput({ ...input, file: files[0] });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullname', input.fullname);
      formData.append('email', input.email);
      formData.append('phoneNumber', input.phoneNumber);
      if (input.password) formData.append('password', input.password);
      if (input.file) formData.append('file', input.file);
      const res = await axios.put(`${USER_API_END_POINT}/update`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        toast.success(res.data.message || 'Profile updated!');
        dispatch(setUser(res.data.user));
      } else {
        toast.error(res.data.message || 'Failed to update profile');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <div className="max-w-xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullname">Full Name</Label>
            <Input id="fullname" name="fullname" value={input.fullname} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" value={input.email} onChange={handleChange} type="email" />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="password">Password (leave blank to keep unchanged)</Label>
            <Input id="password" name="password" value={input.password} onChange={handleChange} type="password" />
          </div>
          <div>
            <Label htmlFor="file">Profile Photo</Label>
            <Input id="file" name="file" type="file" accept="image/*" onChange={handleChange} />
          </div>
          <Button type="submit" disabled={loading} className="bg-purple-600 text-white w-full">Update Profile</Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;