import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#878A91] shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img className="w-[120px] h-[40px]" src={logo} alt="Logo" />
        </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-200 focus:outline-none rounded-lg text-sm p-2.5"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
        <div
          className={`font-semibold md:flex md:items-center w-full md:w-auto ${
            isMenuOpen ? "block" : "hidden"
          } mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8">
            {[
              { text: "Home", link: "/" },
              { text: "Properties", link: "/" },
              { text: "About", link: "/about" },
              { text: "Contact", link: "/contact" },
            ].map((item) => (
              <li key={item} className="relative">
                <Link
                  to={item.link}
                  onClick={toggleMenu}
                  className="block py-2 px-3 text-white hover:text-gray-300"
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <div className="mt-4 md:hidden">
              <Link to={"/sing-in"}>
                <button className="btn hover:shadow-md">Get Started</button>
              </Link>
            </div>
          </ul>
        </div>
        <div className="hidden md:block">
          <Link to={"/sing-in"}>
            <button className="btn hover:shadow-md">Get Started</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
