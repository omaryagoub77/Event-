import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-purple-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-6xl mb-6"
        >
          🎉
        </motion.div>
        <motion.h1 
          className="text-4xl font-bold text-purple-900 mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Elegant Events
        </motion.h1>
        <motion.p 
          className="text-purple-600"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Creating unforgettable moments...
        </motion.p>
        <motion.div
          className="mt-8 w-32 h-1 bg-purple-200 rounded-full mx-auto"
          initial={{ width: 0 }}
          animate={{ width: "8rem" }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <motion.div
            className="h-full bg-pink-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Preloader;