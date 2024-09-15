import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { PowerIcon, UserCircleIcon } from "@heroicons/react/24/solid";
const handleSignOut = () => {
  // Add your sign-out logic here
  console.log("User signed out");
  // Optionally navigate to a different page after signing out
};

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link: "/profile",
  },

  {
    label: "Sign Out",
    icon: PowerIcon,
    onClick: handleSignOut,
  },
];

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Separate state for profile menu
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  const closeMenu = () => setIsMenuOpen(false);

  const toggleNavMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  const getLinkClasses = (path) => {
    const baseClasses = "block py-2 px-3 text-white hover:text-gray-300";
    return location.pathname === path
      ? `${baseClasses} text-gray-800 font-bold`
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
            onClick={toggleNavMenu}
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
                  isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
        <div
          className={`font-semibold md:flex md:items-center w-full md:w-auto ${
            isNavOpen ? "block" : "hidden"
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
                  onClick={toggleNavMenu} // Close nav menu on click
                  className={getLinkClasses(item.link)}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex items-center">
          {currentUser ? (
            <Menu
              open={isMenuOpen}
              handler={setIsMenuOpen}
              placement="bottom-end"
            >
              <MenuHandler>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center rounded-full p-0"
                >
                  <Avatar
                    size="sm"
                    alt="User Avatar"
                    className="border-2 border-gray-400 rounded-full shadow-xl"
                    src={
                      currentUser.avatar ||
                      "https://img.freepik.com/vecteurs-premium/icone-compte-icone-utilisateur-graphiques-vectoriels_292645-552.jpg"
                    }
                  />
                </Button>
              </MenuHandler>
              <MenuList className="p-2 z-50 bg-white shadow-lg rounded-lg">
                {profileMenuItems.map(({ label, icon, link, onClick }, key) => {
                  const isLastItem = key === profileMenuItems.length - 1;

                  return (
                    <MenuItem
                      key={label}
                      onClick={onClick ? onClick : closeMenu} // Call function if available, otherwise close menu
                      className={`flex items-center gap-2 rounded ${
                        isLastItem
                          ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                          : ""
                      }`}
                    >
                      {link ? (
                        <Link to={link} className="flex items-center gap-2">
                          {React.createElement(icon, {
                            className: `h-4 w-4 ${
                              isLastItem ? "text-red-500" : ""
                            }`,
                            strokeWidth: 2,
                          })}
                          <Typography
                            as="span"
                            variant="small"
                            className="font-normal"
                            color={isLastItem ? "red" : "inherit"}
                          >
                            {label}
                          </Typography>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-2">
                          {React.createElement(icon, {
                            className: `h-4 w-4 ${
                              isLastItem ? "text-red-500" : ""
                            }`,
                            strokeWidth: 2,
                          })}
                          <Typography
                            as="span"
                            variant="small"
                            className="font-normal"
                            color={isLastItem ? "red" : "inherit"}
                          >
                            {label}
                          </Typography>
                        </div>
                      )}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
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
