import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const selectedPackageId = searchParams.get("package");

  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    packageId: selectedPackageId || "",
    guests: "",
    notes: ""
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch packages
        const packagesSnapshot = await getDocs(collection(db, "packages"));
        const packagesData = packagesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => a.order - b.order);
        
        // Fetch existing bookings
        const bookingsSnapshot = await getDocs(collection(db, "bookings"));
        const bookingsData = bookingsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setPackages(packagesData);
        setBookings(bookingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unavailable dates (dates with existing bookings)
  const getUnavailableDates = () => {
    return bookings.map(booking => booking.eventDate);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle date validation
  const isDateUnavailable = (date) => {
    return getUnavailableDates().includes(date);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.eventDate || !formData.packageId) {
        throw new Error("Please fill in all required fields");
      }

      // Check if date is unavailable
      if (isDateUnavailable(formData.eventDate)) {
        throw new Error("This date is already booked. Please select another date.");
      }

      // Submit booking
      const bookingData = {
        ...formData,
        status: "pending",
        createdAt: new Date()
      };

      await addDoc(collection(db, "bookings"), bookingData);
      
      setSuccess(true);
      setSubmitting(false);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  // Next step in form
  const nextStep = () => {
    if (currentStep < 4) {
      // Validate current step before proceeding
      if (currentStep === 1 && !formData.eventDate) {
        setError("Please select a date");
        return;
      }
      if (currentStep === 2 && !formData.packageId) {
        setError("Please select a package");
        return;
      }
      setError("");
      setCurrentStep(currentStep + 1);
    }
  };

  // Previous step in form
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Get selected package details
  const selectedPackage = packages.find(pkg => pkg.id === formData.packageId);

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
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Book Your Event</h1>
            <p className="text-xl text-purple-700">
              Reserve our beautiful venue for your special occasion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {success ? (
            <motion.div
              className="max-w-2xl mx-auto text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-12 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold text-purple-900 mb-4">Booking Confirmed!</h2>
              <p className="text-xl text-purple-700 mb-8">
                Thank you for booking with us! We'll contact you shortly to confirm your reservation.
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setCurrentStep(1);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    eventDate: "",
                    packageId: selectedPackageId || "",
                    guests: "",
                    notes: ""
                  });
                }}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Book Another Event
              </button>
            </motion.div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex justify-between relative">
                  <div className="absolute top-4 left-0 right-0 h-1 bg-purple-200 z-0"></div>
                  <div 
                    className="absolute top-4 left-0 h-1 bg-pink-500 z-10 transition-all duration-500"
                    style={{ width: `${(currentStep - 1) * 33.33}%` }}
                  ></div>
                  
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="relative z-20">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        currentStep >= step 
                          ? "bg-pink-500 text-white" 
                          : "bg-white border-2 border-purple-200 text-purple-400"
                      }`}>
                        {step}
                      </div>
                      <div className="text-center mt-2 text-sm font-medium text-purple-700">
                        {step === 1 && "Date"}
                        {step === 2 && "Package"}
                        {step === 3 && "Details"}
                        {step === 4 && "Confirm"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Steps */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-8"
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Step 1: Date Selection */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-purple-900 mb-6">Select Your Event Date</h2>
                    <div className="mb-6">
                      <label className="block text-purple-800 font-medium mb-2">Event Date *</label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                      {getUnavailableDates().length > 0 && (
                        <p className="text-sm text-purple-600 mt-2">
                          <strong>Unavailable dates:</strong> {getUnavailableDates().join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Package Selection */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-purple-900 mb-6">Choose Your Package</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          onClick={() => setFormData(prev => ({ ...prev, packageId: pkg.id }))}
                          className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                            formData.packageId === pkg.id
                              ? "border-pink-500 bg-purple-50"
                              : "border-purple-200 hover:border-purple-300"
                          }`}
                        >
                          {pkg.popular && (
                            <div className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                              MOST POPULAR
                            </div>
                          )}
                          <h3 className="text-xl font-bold text-purple-900 mb-2">{pkg.name}</h3>
                          <div className="text-2xl font-bold text-pink-500 mb-3">${pkg.price}</div>
                          <ul className="space-y-2 mb-4">
                            {pkg.features && pkg.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="text-purple-700 text-sm flex items-start">
                                <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                {feature}
                              </li>
                            ))}
                            {pkg.features && pkg.features.length > 3 && (
                              <li className="text-purple-500 text-sm">+ {pkg.features.length - 3} more features</li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Personal Details */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-purple-900 mb-6">Your Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-purple-800 font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter your full name"
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
                      <div>
                        <label className="block text-purple-800 font-medium mb-2">Phone Number *</label>
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
                        <label className="block text-purple-800 font-medium mb-2">Number of Guests</label>
                        <input
                          type="number"
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          min="1"
                          max="100"
                          className="w-full p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter number of guests"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-purple-800 font-medium mb-2">Special Requests</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Any special requests or notes for your event..."
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold text-purple-900 mb-6">Confirm Your Booking</h2>
                    <div className="bg-purple-50 rounded-2xl p-6 mb-6">
                      <h3 className="text-xl font-bold text-purple-900 mb-4">Event Details</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-purple-700"><strong>Date:</strong> {formData.eventDate}</p>
                          <p className="text-purple-700"><strong>Guests:</strong> {formData.guests || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-purple-700"><strong>Package:</strong> {selectedPackage?.name}</p>
                          <p className="text-purple-700"><strong>Price:</strong> ${selectedPackage?.price}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 rounded-2xl p-6 mb-6">
                      <h3 className="text-xl font-bold text-purple-900 mb-4">Your Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-purple-700"><strong>Name:</strong> {formData.name}</p>
                          <p className="text-purple-700"><strong>Email:</strong> {formData.email}</p>
                        </div>
                        <div>
                          <p className="text-purple-700"><strong>Phone:</strong> {formData.phone}</p>
                        </div>
                      </div>
                      {formData.notes && (
                        <div className="mt-4">
                          <p className="text-purple-700"><strong>Special Requests:</strong> {formData.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl">
                    {error}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`py-3 px-6 rounded-full font-bold ${
                      currentStep === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                    }`}
                  >
                    Back
                  </button>
                  
                  {currentStep < 4 ? (
                    <button
                      onClick={nextStep}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 flex items-center"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Confirming...
                        </>
                      ) : "Confirm Booking"}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Booking;