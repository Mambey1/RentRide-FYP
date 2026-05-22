import React, { useState, useEffect, useRef } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

const API_URL = "http://localhost:5000/api";

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API_URL}/testimonials`);
        if (response.data.success && response.data.data) {
          setTestimonials(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Fallback to default testimonials if API fails
        setTestimonials([
          {
            _id: '1',
            name: "Ramesh Sharma",
            role: "Business Executive",
            text: "Excellent service! The car was clean, well-maintained, and the booking process was seamless. Will definitely use RentRide again for my next trip.",
            rating: 5,
            location: "Kathmandu"
          },
          {
            _id: '2',
            name: "Sunita Thapa",
            role: "Travel Blogger",
            text: "Amazing experience! The driver was professional and the vehicle was in perfect condition. Best car rental service in Kathmandu!",
            rating: 5,
            location: "Pokhara"
          },
          {
            _id: '3',
            name: "Anil Kumar",
            role: "Software Developer",
            text: "Very impressed with the service. Easy booking, transparent pricing, and excellent customer support. Highly recommended!",
            rating: 5,
            location: "Lalitpur"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-scroll effect - continuous smooth scrolling
  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // Reset to 0 when reaching the end of the first set
        if (prev >= testimonials.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getProfilePhotoUrl = (testimonial) => {
    if (testimonial.profilePhoto) {
      if (testimonial.profilePhoto.startsWith('http')) {
        return testimonial.profilePhoto;
      }
      return `http://localhost:5000/uploads/testimonials/${testimonial.profilePhoto}`;
    }
    // Fallback to UI Avatars
    const colors = ['3B82F6', '8B5CF6', '10B981', 'F59E0B', 'EF4444', '06B6D4'];
    const colorIndex = testimonial._id ? parseInt(testimonial._id.slice(-1), 16) % colors.length : 0;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=${colors[colorIndex]}&color=fff&size=128`;
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              <FaStar /> Customer Reviews
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-md animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-4 h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">No testimonials available yet.</p>
          </div>
        </div>
      </section>
    );
  }

  // Triple the testimonials for infinite loop effect
  const displayTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            <FaStar /> Customer Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust RentRide for their transportation needs
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300"
          >
            <FaChevronRight />
          </button>

          {/* Testimonials Container */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {displayTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial._id}-${index}`}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full relative overflow-hidden group">
                    {/* Gradient accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Quote icon */}
                    <div className="relative mb-6">
                      <FaQuoteLeft className="text-blue-500 text-4xl opacity-20" />
                    </div>

                    {/* Review text */}
                    <p className="text-gray-700 leading-relaxed mb-6 relative z-10 text-sm min-h-[80px]">
                      "{testimonial.text}"
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < (testimonial.rating || 5)
                              ? 'text-yellow-400'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Author info */}
                    <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                      <img
                        src={getProfilePhotoUrl(testimonial)}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full border-2 border-blue-100 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=3B82F6&color=fff&size=128`;
                        }}
                      />
                      <div>
                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                        {testimonial.location && (
                          <p className="text-xs text-blue-600 mt-1">📍 {testimonial.location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex % testimonials.length
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;