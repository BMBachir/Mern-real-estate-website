import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getLinkClasses = (path) => {
    const baseClasses = "block py-2 px-3 text-white hover:text-gray-300";
    return location.pathname === path
      ? `${baseClasses} text-gray-800 font-bold ` // Add a bottom border for active link
      : baseClasses;
  };

  return (
    <nav className="bg-[#878A91] sticky top-0 z-50">
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
              { text: "Properties", link: "/properties" },
              { text: "About", link: "/about" },
              { text: "Contact", link: "/contact" },
            ].map((item) => (
              <li key={item.link} className="relative">
                <Link
                  to={item.link}
                  onClick={toggleMenu}
                  className={getLinkClasses(item.link)}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li className="mt-4 md:hidden">
              {currentUser ? (
                <Link to={"/profile"} className="flex items-center">
                  <div className="relative rounded-full h-10 w-10 overflow-hidden">
                    <img
                      src={
                        currentUser.avatar ||
                        "https://img.freepik.com/vecteurs-premium/icone-compte-icone-utilisateur-graphiques-vectoriels_292645-552.jpg"
                      }
                      alt="User Avatar"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>
              ) : (
                <Link to={"/sign-in"}>
                  <button className="bg-slate-100 text-[#878A91] hover:text-slate-100 hover:bg-gray-500 inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium shadow-sm transition-colors focus:outline-none hover:shadow-md">
                    Get Started
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center">
          {currentUser ? (
            <Link to={"/profile"}>
              <div className="relative rounded-full h-9 w-9 overflow-hidden">
                <img
                  src={
                    currentUser.avatar ||
                    "https://img.freepik.com/vecteurs-premium/icone-compte-icone-utilisateur-graphiques-vectoriels_292645-552.jpg"
                  }
                  alt="User Avatar"
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
          ) : (
            <Link to={"/sign-in"}>
              <button className="bg-slate-100 text-[#878A91] hover:text-slate-100 hover:bg-gray-500 inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium shadow-sm transition-colors focus:outline-none hover:shadow-md">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
