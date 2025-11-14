import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const Home = () => {
  const [heroData, setHeroData] = useState({
    headline: "Create Unforgettable Moments",
    subtext: "Our elegant venue is perfect for birthdays, celebrations, and intimate gatherings",
    backgroundUrl: ""
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const docRef = doc(db, "settings", "hero");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHeroData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6 leading-tight">
                {heroData.headline}
              </h1>
              <p className="text-xl text-purple-700 mb-8 max-w-lg">
                {heroData.subtext}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/booking" 
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Book Your Event
                </Link>
                <Link 
                  to="/gallery" 
                  className="border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-bold py-3 px-8 rounded-full transition duration-300 text-center"
                >
                  View Gallery
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-2xl"></div>
                <div className="absolute top-4 -right-4 w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-white shadow-xl border-8 border-white">
                  <img 
                    src={heroData.backgroundUrl || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"} 
                    alt="Event Venue" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-pink-200 opacity-50 blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-purple-200 opacity-50 blur-xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">Why Choose Our Venue?</h2>
            <p className="text-xl text-purple-600 max-w-2xl mx-auto">
              We provide everything you need for a perfect celebration
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Elegant Space",
                description: "Beautifully designed interior with premium furnishings and ambient lighting",
                icon: "🏰"
              },
              {
                title: "Flexible Packages",
                description: "Customizable options to suit your budget and guest count",
                icon: "🎁"
              },
              {
                title: "Full Support",
                description: "Dedicated event coordinator to ensure everything goes smoothly",
                icon: "👩‍💼"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-purple-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">{feature.title}</h3>
                <p className="text-purple-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Perfect Event?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us help you create unforgettable memories in our beautiful space
            </p>
            <Link 
              to="/booking" 
              className="inline-block bg-white text-purple-600 hover:bg-purple-100 font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Schedule a Tour
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;