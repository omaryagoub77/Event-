import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPolicy, setOpenPolicy] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "policies"));
        const policiesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => a.order - b.order);
        
        setPolicies(policiesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching policies:", error);
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const togglePolicy = (id) => {
    setOpenPolicy(openPolicy === id ? null : id);
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
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Policies & Guidelines</h1>
            <p className="text-xl text-purple-700">
              Important information for booking and hosting your event
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policies List */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {policies.length > 0 ? (
              <div className="space-y-6">
                {policies.map((policy, index) => (
                  <motion.div
                    key={policy.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => togglePolicy(policy.id)}
                      className="w-full flex justify-between items-center p-6 text-left"
                    >
                      <h3 className="text-xl font-bold text-purple-900">{policy.title}</h3>
                      <div className="text-2xl text-purple-600">
                        {openPolicy === policy.id ? '−' : '+'}
                      </div>
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{
                        height: openPolicy === policy.id ? "auto" : 0,
                        opacity: openPolicy === policy.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-purple-700">
                        {policy.description}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-purple-900 mb-4">No policies available</h3>
                <p className="text-purple-700">Check back later for updates.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Policies;