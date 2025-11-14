import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Facilities from './pages/Facilities'
import Gallery from './pages/Gallery'
import Packages from './pages/Packages'
import Booking from './pages/Booking'
import Policies from './pages/Policies'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </div>
  )
}

export default App