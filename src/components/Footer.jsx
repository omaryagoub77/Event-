import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Facilities', path: '/facilities' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Packages', path: '/packages' },
        { name: 'Booking', path: '/booking' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'Contact', path: '/contact' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Policies', path: '/policies' },
      ],
    },
  ];

  return (
    <footer className="bg-purple-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              <span className="text-pink-500">Elegant</span>Events
            </h2>
            <p className="text-purple-200">
              Creating unforgettable moments in our beautiful event space. Perfect for birthdays, 
              celebrations, and intimate gatherings.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-pink-400 hover:text-white transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-pink-400 hover:text-white transition-colors">
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="text-purple-200 hover:text-pink-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-pink-400 mt-1 mr-3" />
                <span className="text-purple-200">123 Event Street, Celebration City</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-pink-400 mr-3" />
                <span className="text-purple-200">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-pink-400 mr-3" />
                <span className="text-purple-200">info@elegantevents.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-800 mt-12 pt-8 text-center text-purple-300">
          <p>&copy; {new Date().getFullYear()} Elegant Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;