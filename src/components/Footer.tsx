import Link from "next/link";
import {
  FaDribbble,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div>
        <footer className="bg-[#1f2937] text-gray-300 py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo and Description */}
              <div className="col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
                  <span className="text-white text-xl font-semibold">
                    gethired.
                  </span>
                </div>
                <p className="text-gray-400 mb-6">
                  Great platform for the job seeker that passionate about
                  startups. Find your dream job easier.
                </p>
              </div>

              {/* About Section */}
              <div className="col-span-1">
                <h3 className="text-white text-lg font-semibold mb-4">About</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/companies" className="hover:text-white">
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-white">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/advice" className="hover:text-white">
                      Advice
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources Section */}
              <div className="col-span-1">
                <h3 className="text-white text-lg font-semibold mb-4">
                  Resources
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/help-docs" className="hover:text-white">
                      Help Docs
                    </Link>
                  </li>
                  <li>
                    <Link href="/guide" className="hover:text-white">
                      Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/updates" className="hover:text-white">
                      Updates
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter Section */}
              <div className="col-span-1">
                <h3 className="text-white text-lg font-semibold mb-4">
                  Get job notifications
                </h3>
                <p className="text-gray-400 mb-4">
                  The latest job news, articles, sent to your inbox weekly.
                </p>
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="flex-grow px-4 py-2 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 sm:mb-0">
                2021 © gethired.. All rights reserved.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                <Link
                  href="https://facebook.com"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <FaFacebook className="w-5 h-5 text-gray-400" />
                </Link>
                <Link
                  href="https://instagram.com"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <FaInstagram className="w-5 h-5 text-gray-400" />
                </Link>
                <Link
                  href="https://dribbble.com"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <FaDribbble className="w-5 h-5 text-gray-400" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <FaLinkedin className="w-5 h-5 text-gray-400" />
                </Link>
                <Link
                  href="https://twitter.com"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <FaTwitter className="w-5 h-5 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
