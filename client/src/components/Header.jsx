import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap ">
            <span className="text-slate-500"> Boub </span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form action="" className="flex items-center">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search.."
              className="bg-slate-100 rounded-full py-2 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent shadow-md"
            />
            <FaSearch className="absolute left-3 text-slate-600" />
          </div>
        </form>
        <ul className="flex gap-6">
          <Link to="/">
            <li className="hidden  sm:inline text-slate-700 hover:underline ">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden  sm:inline text-slate-700 hover:underline ">
              About
            </li>
          </Link>
          <Link to="/sing-in">
            <li className=" text-slate-700 hover:underline ">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
