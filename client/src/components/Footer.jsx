import React from "react";
import { Link } from "react-router-dom";
import { LuFacebook } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="flex flex-col items-start">
          <Link className="inline-flex items-center space-x-2 mb-4" to={"/"}>
            <span className="text-xl font-bold">KriDar</span>
          </Link>
          <div className="space-y-2 text-sm">
            <div>
              <CiPhone className="h-4 w-4 inline-block mr-2 text-gray-400" />
              <a href="#">+213 (000) 0000000</a>
            </div>
            <div>
              <MdOutlineEmail className="h-4 w-4 inline-block mr-2 text-gray-400" />
              <a href="#">info@KriDar.com</a>
            </div>
            <div>
              <CiLocationOn className="h-4 w-4 inline-block mr-2 text-gray-400" />
              <span>Alger, Algeria</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <nav className="grid grid-cols-2 gap-2">
            <Link className="hover:text-gray-400" href="#">
              Home
            </Link>
            <Link className="hover:text-gray-400" href="#">
              About
            </Link>
            <Link className="hover:text-gray-400" href="#">
              Properties
            </Link>
            <Link className="hover:text-gray-400" href="#">
              Contact
            </Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <div className="flex space-x-4">
            <Link className="hover:text-gray-400">
              <LuFacebook className="h-6 w-6" />
            </Link>
            <Link className="hover:text-gray-400">
              <FaXTwitter className="h-6 w-6" />
            </Link>
            <Link className="hover:text-gray-400">
              <FaInstagram className="h-6 w-6" />
            </Link>
            <Link className="hover:text-gray-400">
              <CiLinkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 md:mt-12 text-center text-sm text-gray-400">
        © 2024 KriDar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
