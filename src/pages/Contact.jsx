import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill in all required fields");
      }

      // Submit contact form
      const contactData = {
        ...formData,
        createdAt: new Date()
      };

      await addDoc(collection(db, "contacts"), contactData);
      
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

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
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Contact Us</h1>
            <p className="text-xl text-purple-700">
              Get in touch with us for bookings, inquiries, or any questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-purple-900 mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-4 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Our Location</h3>
                    <p className="text-purple-700">
                      123 Event Street<br />
                      Celebration City, CC 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-4 rounded-full mr-4">
                    <FaPhone className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Phone Number</h3>
                    <p className="text-purple-700">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-4 rounded-full mr-4">
                    <FaEnvelope className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Email Address</h3>
                    <p className="text-purple-700">info@elegantevents.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-4 rounded-full mr-4">
                    <FaInstagram className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-purple-600 hover:text-pink-500 transition-colors">
                        <FaInstagram size={24} />
                      </a>
                      <a href="#" className="text-purple-600 hover:text-pink-500 transition-colors">
                        <FaWhatsapp size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <motion.div
                className="mt-12 rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-gray-400 text-4xl mx-auto mb-4" />
                    <p className="text-gray-500">Interactive Map Placeholder</p>
                    <p className="text-gray-400 text-sm mt-2">Map embed URL would go here</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-purple-50 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-purple-900 mb-8">Send Us a Message</h2>
                
                {success ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6">
                    <p className="font-bold">Thank you for your message!</p>
                    <p>We'll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-purple-800 font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-purple-800 font-medium mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-purple-800 font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-purple-800 font-medium mb-2">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter subject"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-purple-800 font-medium mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="5"
                        className="w-full p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>
                    
                    {error && (
                      <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl">
                        {error}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition duration-300 flex items-center justify-center"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Contact;