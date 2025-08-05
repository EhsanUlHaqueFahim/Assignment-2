import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import FeaturesSection from './FeaturesSection'
import TestimonialsSection from './TestimonialsSection'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Home = () => {
  useGetAllJobs();
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
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