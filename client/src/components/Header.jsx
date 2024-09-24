import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  Typography,
  Collapse,
  ListItem,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { persistor } from "../redux/store";
import { FaUserGear } from "react-icons/fa6";
import { BsFillHouseAddFill } from "react-icons/bs";
import { BsFillHousesFill } from "react-icons/bs";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { IoIosArrowUp } from "react-icons/io";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenAvatar, setIsMenuOpenAvatar] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      await persistor.purge(); // Clear persisted Redux state

      // Sign-out success
      dispatch(signOutUserSuccess());
      navigate("/sign-in"); // Redirect to login page after sign out
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  // Profile menu component
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: FaUserGear,
      link: "/profile",
    },
    {
      label: "Create listing",
      icon: BsFillHouseAddFill,
      link: "/create-listing",
    },
    {
      label: "Your listings",
      icon: BsFillHousesFill,
      link: "/user-listings",
    },
    {
      label: "Sign Out",
      icon: LiaSignOutAltSolid,
      onClick: handleSignOut,
    },
  ];

  // Navigation menu items
  const navListMenuItems = [
    {
      title: "Products",
      description: "Find the perfect solution for your needs.",
      icon: FaUserGear,
      link: "/properties",
    },
    {
      title: "Services",
      description: "Learn how we can help you achieve your goals.",
      icon: FaUserGear,
      link: "/service",
    },
    {
      title: "Contact",
      description: "Get in touch with us.",
      icon: FaUserGear,
      link: "/contact",
    },
  ];

  const closeMenu = () => setIsMenuOpen(false);
  const toggleNavMenu = () => {
    setIsNavOpen((prev) => !prev);
  };

  // Render menu items
  const renderMenuItems = (items) => {
    return items.map(({ icon, title, description, link }, key) => (
      <a href={link} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg bg-gray-100/10 backdrop-blur-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2">
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ));
  };

  return (
    <nav className="header bg-gray-100/10 backdrop-blur-lg sticky top-0 z-50 rounded-xl h-[70px] max-w-screen-xl mx-auto mt-4 shadow-lg border border-white/20">
      <div className="flex flex-wrap items-center justify-between p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img className="w-[120px] h-[40px]" src={logo} alt="Logo" />
        </Link>
        <div className="md:hidden ">
          <button
            onClick={toggleNavMenu}
            className="focus:outline-none rounded-lg text-sm p-2.5 text-gray-900"
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
            isNavOpen ? "hidden" : "hidden"
          } mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 items-center">
            <li>
              <Button
                variant="text"
                className="hover:bg-white hover:bg-opacity-30 normal-case font-semibold text-sm"
              >
                <Link to="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button
                variant="text"
                className="hover:bg-white hover:bg-opacity-30 normal-case font-semibold text-sm "
              >
                <Link to="/about">About</Link>
              </Button>
            </li>
            <Menu
              open={isMenuOpen}
              handler={setIsMenuOpen}
              offset={{ mainAxis: 20 }}
              placement="top"
              allowHover={true}
            >
              <MenuHandler className="">
                <Typography as="div" variant="small" className="text-semibold">
                  <ListItem
                    selected={isMenuOpen}
                    onClick={() => setIsMenuOpen((cur) => !cur)}
                    className="flex gap-2 items-center justify-center text-semibold text-gray-900 hover:bg-white hover:bg-opacity-30 normal-case font-semibold text-sm"
                  >
                    <span className="font-semibold">Pages</span>
                    <div className="w-3 h-3">
                      <IoIosArrowUp
                        strokeWidth={2.5}
                        className={`block h-3 w-3 transition-transform ${
                          isMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </ListItem>
                </Typography>
              </MenuHandler>
              <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
                <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0 hover:bg-white hover:bg-opacity-30 normal-case font-semibold text-sm ">
                  {renderMenuItems(navListMenuItems)}
                </ul>
              </MenuList>
            </Menu>
          </ul>
        </div>
        <div className="hidden md:flex items-center">
          {currentUser ? (
            <Menu
              className="outline-none"
              open={isMenuOpenAvatar}
              handler={setIsMenuOpenAvatar}
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
                    className="border-2 h-[45px] w-[45px] border-gray-400 rounded-full shadow-xl"
                    src={
                      currentUser.avatar ||
                      "https://img.freepik.com/vecteurs-premium/icone-compte-icone-utilisateur-graphiques-vectoriels_292645-552.jpg"
                    }
                  />
                </Button>
              </MenuHandler>
              <MenuList className="p-5 z-50 mt-2 ml-16 bg-white shadow-lg rounded-lg">
                {profileMenuItems.map(({ label, icon, link, onClick }) => (
                  <MenuItem
                    key={label}
                    className="flex items-center gap-3 rounded-lg hover:bg-blue-gray-100"
                    onClick={onClick}
                  >
                    {React.createElement(icon, {
                      className: "w-5 h-5",
                    })}
                    <Link to={link}>
                      <Typography className="text-sm font-medium text-gray-900">
                        {label}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          ) : (
            <Link to="/sign-in">
              <Button className="bg-blue-500 text-white hover:bg-blue-600 font-medium px-4 py-2 rounded-lg">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      <Collapse open={isNavOpen} className="md:hidden">
        <ul className="flex flex-col gap-2 mt-4 bg-white rounded-lg shadow-lg">
          <li>
            <Button
              variant="text"
              className="normal-case font-semibold text-sm w-full text-left hover:bg-gray-100"
            >
              <Link to="/">Home</Link>
            </Button>
          </li>
          <li>
            <Button
              variant="text"
              className="normal-case font-semibold text-sm w-full text-left hover:bg-gray-100"
            >
              <Link to="/about">About</Link>
            </Button>
          </li>
          {renderMenuItems(navListMenuItems)} {/* Render other nav items */}
        </ul>
      </Collapse>
    </nav>
  );
};

export default Header;
