import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const testimonialsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => b.createdAt - a.createdAt);
        
        setTestimonials(testimonialsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Client Testimonials</h1>
            <p className="text-xl text-purple-700">
              Hear what our clients have to say about their experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {testimonials.length > 0 ? (
              <div className="relative">
                {/* Carousel Container */}
                <div className="overflow-hidden rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm p-8">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    {/* Rating */}
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-8 h-8 ${
                            i < (testimonials[currentIndex]?.rating || 5)
                              ? "text-yellow-400"
                              : "text-white text-opacity-30"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review */}
                    <p className="text-xl text-white mb-8 italic">
                      "{testimonials[currentIndex]?.review}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-purple-200 border-4 border-white overflow-hidden mr-4">
                        {testimonials[currentIndex]?.photo ? (
                          <img
                            src={testimonials[currentIndex]?.photo}
                            alt={testimonials[currentIndex]?.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-purple-300 to-pink-300 flex items-center justify-center text-white font-bold">
                            {testimonials[currentIndex]?.name?.charAt(0) || "U"}
                          </div>
                        )}
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-white">
                          {testimonials[currentIndex]?.name}
                        </h3>
                        <p className="text-purple-200">
                          {testimonials[currentIndex]?.eventDate 
                            ? `Event: ${new Date(testimonials[currentIndex]?.eventDate?.seconds * 1000).toLocaleDateString()}` 
                            : "Happy Customer"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex ? "bg-white" : "bg-white bg-opacity-30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">No testimonials yet</h3>
                <p className="text-purple-200">Check back later for updates.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">All Testimonials</h2>
            <p className="text-xl text-purple-700 max-w-2xl mx-auto">
              More from our happy clients
            </p>
          </motion.div>
          
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-purple-50 rounded-2xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < (testimonial.rating || 5)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-purple-700 mb-6 italic">
                    "{testimonial.review}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-purple-200 border-2 border-white overflow-hidden mr-3">
                      {testimonial.photo ? (
                        <img
                          src={testimonial.photo}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-purple-300 to-pink-300 flex items-center justify-center text-white font-bold text-sm">
                          {testimonial.name?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-900">{testimonial.name}</h3>
                      <p className="text-sm text-purple-600">
                        {testimonial.eventDate 
                          ? new Date(testimonial.eventDate?.seconds * 1000).toLocaleDateString() 
                          : "Happy Customer"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">No testimonials available</h3>
              <p className="text-purple-700">Check back later for updates.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Testimonials;