import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Senior Frontend Developer",
            company: "TechCorp",
            content: "WorkNest helped me find my dream job at a top tech company. The platform's smart matching made the job search process incredibly smooth.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Michael Chen",
            role: "Product Manager",
            company: "InnovateLab",
            content: "I was amazed by how quickly I found relevant opportunities. WorkNest's interface is intuitive and the job recommendations are spot-on.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Emily Rodriguez",
            role: "Data Scientist",
            company: "DataFlow Inc",
            content: "The quality of companies and job postings on WorkNest is outstanding. I found a position that perfectly matches my career goals.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
    ];

    return (
        <div className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
                        Success <span className="text-[#6A38C2]">Stories</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Hear from professionals who found their dream jobs through WorkNest. 
                        Join thousands of satisfied users who transformed their careers.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index}
                            className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex items-center mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <Quote className="h-8 w-8 text-[#6A38C2] mb-4 opacity-50" />
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center">
                                <img 
                                    src={testimonial.avatar} 
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role} at {testimonial.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#6A38C2] to-purple-600 text-white px-8 py-4 rounded-full">
                        <span className="text-2xl font-bold">4.9</span>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-white text-white" />
                            ))}
                        </div>
                        <span className="font-medium">from 10,000+ reviews</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection; 