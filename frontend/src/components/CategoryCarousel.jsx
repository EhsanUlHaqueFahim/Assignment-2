import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer", 
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "UI/UX Designer",
    "Product Manager",
    "Mobile Developer",
    "Cloud Engineer",
    "AI/ML Engineer",
    "Cybersecurity",
    "Digital Marketing"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="py-16 bg-gradient-to-r from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Explore Popular <span className="text-[#6A38C2]">Job Categories</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find opportunities in your field of expertise. Browse through our curated categories 
                        to discover the perfect role for your career growth.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {category.slice(0, 8).map((cat, index) => (
                        <Button 
                            key={index}
                            onClick={() => searchJobHandler(cat)} 
                            variant="outline" 
                            className="h-16 rounded-xl border-2 hover:border-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all duration-300 font-medium text-sm"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
                
                <div className="text-center">
                    <Button 
                        onClick={() => navigate("/browse")}
                        className="bg-gradient-to-r from-[#6A38C2] to-purple-600 hover:from-[#5b30a6] hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium"
                    >
                        View All Categories
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CategoryCarousel