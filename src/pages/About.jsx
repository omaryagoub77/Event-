import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">About Elegant Events</h1>
            <p className="text-xl text-purple-700">
              Creating magical moments in our beautiful space
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="w-full h-96 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 shadow-xl"></div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-2xl bg-white shadow-xl border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                    alt="Venue Owner" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-purple-900 mb-6">Our Story</h2>
              <p className="text-purple-700 mb-6 text-lg">
                Founded by Sarah Johnson, a passionate event planner with over 10 years of experience, 
                Elegant Events was born from a vision to create a warm, welcoming space where families 
                and friends can celebrate life's special moments.
              </p>
              <p className="text-purple-700 mb-6 text-lg">
                After hosting countless events in various venues, Sarah realized there was something missing - 
                a space that combined elegance with comfort, sophistication with playfulness. Thus, Elegant Events 
                was created to fill that gap.
              </p>
              <p className="text-purple-700 text-lg">
                Today, our venue hosts birthday parties, baby showers, anniversary celebrations, and other 
                intimate gatherings. We pride ourselves on personalized service and attention to detail 
                that makes every event truly special.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">Our Values</h2>
            <p className="text-xl text-purple-700 max-w-2xl mx-auto">
              What guides us in creating exceptional experiences
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Warmth & Hospitality",
                description: "We believe in creating a home away from home for every guest.",
                icon: "🏡"
              },
              {
                title: "Attention to Detail",
                description: "Every aspect of your event is carefully planned and executed.",
                icon: "🔍"
              },
              {
                title: "Personalization",
                description: "Each event is unique and tailored to your vision and style.",
                icon: "🎨"
              },
              {
                title: "Quality",
                description: "We use only the finest materials and services for your celebration.",
                icon: "⭐"
              },
              {
                title: "Integrity",
                description: "Transparent pricing and honest communication throughout.",
                icon: "🤝"
              },
              {
                title: "Sustainability",
                description: "We strive to minimize waste and environmental impact.",
                icon: "🌱"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="text-5xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">{value.title}</h3>
                <p className="text-purple-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;