import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8">
          
          {/* Logo & Info */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-blue-400">TaskFlow</h2>
            <p className="text-gray-400 text-sm mt-2">
              Simplify your workflow. Stay organized. Boost productivity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-lg text-blue-400">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
                <li><a href="/about" className="hover:text-blue-400 transition">About Us</a></li>
                <li><a href="/faq" className="hover:text-blue-400 transition">FAQ</a></li>
                <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-blue-400">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="/features" className="hover:text-blue-400 transition">Features</a></li>
                <li><a href="/pricing" className="hover:text-blue-400 transition">Pricing</a></li>
                <li><a href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-blue-400 transition">Terms of Service</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-lg text-blue-400">Follow Us</h3>
              <div className="mt-4 flex space-x-4 justify-center md:justify-start">
                <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition">
                  <FaFacebookF className="text-white" />
                </a>
                <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition">
                  <FaTwitter className="text-white" />
                </a>
                <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition">
                  <FaInstagram className="text-white" />
                </a>
                <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition">
                  <FaLinkedinIn className="text-white" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} TaskFlow. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
