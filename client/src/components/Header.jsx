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
    <nav className="bg-white border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} />
        </Link>
        <div className="md:hidden  ">
          <button
            onClick={toggleMenu}
            className="ml-60 text-gray-500 dark:text-gray-400  focus:outline-none  focus:ring-gray-200 rounded-lg text-sm p-2.5 me-1"
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
          className={` font-semibold  md:flex md:order-2 ${
            isMenuOpen ? "block" : "hidden"
          } mt-4 md:mt-0 w-full md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 ">
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/sing-in"
                onClick={toggleMenu}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0   "
              >
                Sign in
              </Link>
            </li>
          </ul>
          <div className="mt-4 md:mt-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className=" md:hidden h-5 w-5 text-gray-400 dark:text-gray-600" />
              </div>
              <input
                type="text"
                id="mobile-search"
                className="md:hidden block w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className="flex md:order-3 md:ml-4">
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400 dark:text-gray-600" />
            </div>
            <input
              type="text"
              id="desktop-search"
              className="block w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none "
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
