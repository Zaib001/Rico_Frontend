import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start px-6">
          {/* Logo Section */}
          <div className="mb-8 md:mb-0">
            <div className="text-5xl font-bold text-lime-400 mb-2">
              LiiQwise
            </div>
            {/* Description or tagline */}
            <p className="text-sm text-gray-400">
              Connecting hearts around the world.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* About Section */}
            <div>
              <h4 className="text-xl font-semibold text-lime-400 mb-4">
                LiiQwise
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/about-us"
                    className="hover:text-lime-400 transition"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-use"
                    className="hover:text-lime-400 transition"
                  >
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-lime-400 transition"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="hover:text-lime-400 transition"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community Section */}
            <div>
              <h4 className="text-xl font-semibold text-lime-400 mb-4">
                Community
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/faq" className="hover:text-lime-400 transition">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/community-guidelines"
                    className="hover:text-lime-400 transition"
                  >
                    Community guidelines
                  </Link>
                </li>
                <li>
                  <Link
                    to="/safety-tips"
                    className="hover:text-lime-400 transition"
                  >
                    Safety tips
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-support"
                    className="hover:text-lime-400 transition"
                  >
                    Contact support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          © 2024 LiiQwise. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
