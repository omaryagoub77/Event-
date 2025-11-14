import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "packages"));
        const packagesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => a.order - b.order);
        
        setPackages(packagesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

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
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Event Packages</h1>
            <p className="text-xl text-purple-700">
              Choose the perfect package for your special occasion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {packages.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  className={`rounded-2xl p-8 shadow-lg relative overflow-hidden ${
                    pkg.popular 
                      ? "border-2 border-pink-500 bg-gradient-to-br from-purple-50 to-pink-50" 
                      : "bg-white border border-purple-100"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-pink-500 text-white px-6 py-1 rounded-bl-lg font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-purple-900 mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-bold text-pink-500 mb-4">
                      ${pkg.price}
                      <span className="text-lg text-purple-700">/event</span>
                    </div>
                    <p className="text-purple-700">{pkg.description}</p>
                  </div>
                  
                  <ul className="mb-8 space-y-3">
                    {pkg.features && pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-purple-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to={`/booking?package=${pkg.id}`}
                    className={`block text-center font-bold py-3 px-6 rounded-full transition duration-300 ${
                      pkg.popular
                        ? "bg-pink-500 hover:bg-pink-600 text-white shadow-lg"
                        : "bg-purple-100 hover:bg-purple-200 text-purple-800"
                    }`}
                  >
                    Select Package
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">No packages available</h3>
              <p className="text-purple-700">Check back later for updates.</p>
            </div>
          )}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Custom Package?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We can create a personalized package tailored to your specific needs
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-white text-purple-600 hover:bg-purple-100 font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Packages;