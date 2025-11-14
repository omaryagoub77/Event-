import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "faqs"));
        const faqsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => a.order - b.order);
        
        setFaqs(faqsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
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
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-purple-700">
              Find answers to common questions about our venue and services
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqs.length > 0 ? (
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex justify-between items-center p-6 text-left"
                    >
                      <h3 className="text-xl font-bold text-purple-900">{faq.question}</h3>
                      <div className="text-2xl text-purple-600">
                        {openFaq === faq.id ? '−' : '+'}
                      </div>
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === faq.id ? "auto" : 0,
                        opacity: openFaq === faq.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-purple-700">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-purple-900 mb-4">No FAQs available</h3>
                <p className="text-purple-700">Check back later for updates.</p>
              </div>
            )}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team is here to help you plan your perfect event
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-white text-purple-600 hover:bg-purple-100 font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default FAQ;