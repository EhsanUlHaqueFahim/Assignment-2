import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const Companies = () => {
  const { user } = useSelector(store => store.auth);
  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    if (user?.role === 'recruiter') {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
        setCompanies(res.data.companies || []);
      } catch (err) {
        setCompanies([]);
      }
    }
  };

  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line
  }, [user]);

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    if (!companyName) return toast.error("Company name is required");
    setLoading(true);
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setCompanyName("");
        fetchCompanies();
      } else {
        toast.error(res.data.message || "Failed to create company");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <div className="max-w-3xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Your Companies</h2>
        {user?.role === 'recruiter' && (
          <form onSubmit={handleCreateCompany} className="mb-8">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              className="mb-2"
              placeholder="Enter company name"
            />
            <Button type="submit" disabled={loading} className="bg-purple-600 text-white w-full">Create Company</Button>
          </form>
        )}
        <div>
          {companies.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No companies found.</p>
          ) : (
            <ul className="space-y-2">
              {companies.map(company => (
                <li key={company._id} className="border rounded p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <span className="font-semibold">{company.name}</span> <span className="text-xs text-gray-400 dark:text-gray-300">(ID: {company._id})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Companies;