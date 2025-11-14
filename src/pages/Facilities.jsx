import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUtensils, FaMusic, FaTree, FaCouch, FaGlassCheers, FaBirthdayCake } from "react-icons/fa";
import ScrollToTop from "../components/ScrollToTop";

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "facilities"));
        const facilitiesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => a.order - b.order);
        
        setFacilities(facilitiesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching facilities:", error);
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  // Icon mapping
  const iconMap = {
    FaUtensils: <FaUtensils />,
    FaMusic: <FaMusic />,
    FaTree: <FaTree />,
    FaCouch: <FaCouch />,
    FaGlassCheers: <FaGlassCheers />,
    FaBirthdayCake: <FaBirthdayCake />
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
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Our Facilities</h1>
            <p className="text-xl text-purple-700">
              Everything you need for a perfect celebration
            </p>
          </motion.div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {facilities.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}
            >
              {facilities.map((facility, index) => (
                <motion.div
                  key={facility.id}
                  className="bg-white rounded-2xl p-8 shadow-lg text-center border border-purple-100 hover:border-pink-300 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    scale: 1.02
                  }}
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 text-purple-600 mb-6 text-2xl">
                    {iconMap[facility.icon] || <FaCouch />}
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">{facility.title}</h3>
                  <p className="text-purple-700">{facility.description}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">No facilities available</h3>
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

export default Facilities;