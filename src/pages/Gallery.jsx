import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const filters = ["All", "Birthdays", "Weddings", "Corporate"];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        const galleryData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => b.uploadedAt - a.uploadedAt);
        
        setGalleryItems(galleryData);
        setFilteredItems(galleryData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gallery:", error);
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === activeFilter));
    }
  }, [activeFilter, galleryItems]);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
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
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Event Gallery</h1>
            <p className="text-xl text-purple-700">
              Memories from our beautiful venue
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-pink-500 text-white shadow-lg"
                    : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {filteredItems.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => openLightbox(item)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.url || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"}
                        alt={item.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <h3 className="text-white font-bold text-xl">{item.caption}</h3>
                        <p className="text-purple-200">{item.category}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">No gallery items found</h3>
              <p className="text-purple-700">Check back later for updates.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white text-3xl z-10"
                onClick={closeLightbox}
              >
                ×
              </button>
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white font-bold text-2xl mb-2">{selectedImage.caption}</h3>
                <p className="text-purple-200">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Gallery;