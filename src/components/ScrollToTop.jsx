import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={scrollToTop}
        className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition-all"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </motion.div>
  );
};

export default ScrollToTop;