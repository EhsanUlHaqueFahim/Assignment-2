import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import FeaturesSection from './FeaturesSection'
import TestimonialsSection from './TestimonialsSection'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <FeaturesSection />
      <LatestJobs />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}

export default Home