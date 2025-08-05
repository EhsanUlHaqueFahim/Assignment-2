import React from 'react';
import { Search, Users, TrendingUp, Shield, Clock, Award } from 'lucide-react';

const FeaturesSection = () => {
    const features = [
        {
            icon: <Search className="h-8 w-8" />,
            title: "Smart Job Matching",
            description: "Our AI-powered algorithm matches you with the perfect job opportunities based on your skills and preferences."
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: "Top Companies",
            description: "Connect with leading companies and startups that value innovation and employee growth."
        },
        {
            icon: <TrendingUp className="h-8 w-8" />,
            title: "Career Growth",
            description: "Access resources and opportunities that help you advance your career and achieve your professional goals."
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: "Secure Platform",
            description: "Your data is protected with enterprise-grade security. Your privacy and information are our top priority."
        },
        {
            icon: <Clock className="h-8 w-8" />,
            title: "Quick Application",
            description: "Apply to multiple jobs with just a few clicks. Save time with our streamlined application process."
        },
        {
            icon: <Award className="h-8 w-8" />,
            title: "Verified Employers",
            description: "All companies are verified to ensure you're applying to legitimate and reputable organizations."
        }
    ];

    return (
        <div className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
                        Why Choose <span className="text-[#6A38C2]">WorkNest</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        We're not just a job board - we're your career partner. 
                        Discover what makes WorkNest the preferred choice for job seekers worldwide.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-[#6A38C2]/20"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-[#6A38C2] to-purple-600 rounded-xl flex items-center justify-center text-white mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection; 