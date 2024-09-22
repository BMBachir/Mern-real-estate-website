import React, { useState } from "react";
import CardList from "../components/CardList";
import { IoChevronDownOutline } from "react-icons/io5";
import ProprietiesImage from "../images/proprieties.png";

// Custom Select Component
const CustomSelect = ({ options, label, onChange, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative ">
      <button
        className="flex justify-between items-center w-44 pl-3 bg-white  py-3 text-lg text-gray-900 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
        <IoChevronDownOutline className="w-6 h-6 text-gray-500" />
      </button>

      {isOpen && (
        <ul className="absolute bg-white border w-44  border-gray-300 rounded-lg shadow-lg mt-2 z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-6 py-2  text-lg text-gray-900 hover:bg-indigo-400 rounded-lg hover:text-white cursor-pointer transition duration-150 ease-in-out"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Properties = () => {
  // State for form values
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Rent");
  const [priceRange, setPriceRange] = useState("Price Range");

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", { location, propertyType, priceRange });
    // Add your search functionality here
  };

  const propertyTypes = ["Rent", "Sale"];
  const priceRanges = [
    "Price Range",
    "$100k - $200k",
    "$200k - $500k",
    "$500k+",
  ];

  return (
    <>
      {/* Hero Section with Background Image */}
      <section
        className="py-16 md:py-24 lg:py-32 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${ProprietiesImage})` }}
      >
        {/* Content */}
        <div className="relative container px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Find Your Dream Home
            </h1>
            <p className="text-white text-lg md:text-xl">
              Browse through our exclusive listings to find the perfect property
              for you.
            </p>
          </div>

          {/* Search Form */}
          <form
            className="w-full max-w-5xl mx-auto mt-12 relative z-10"
            onSubmit={handleSearch}
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
              {/* Location Input */}
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search by location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl px-6 py-3 text-lg text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg"
                />
              </div>

              {/* Custom Property Type Dropdown */}
              <div className="">
                <CustomSelect
                  options={propertyTypes}
                  label="Property Type"
                  selectedOption={propertyType}
                  onChange={setPropertyType}
                />
              </div>

              {/* Custom Price Range Dropdown */}
              <div className="">
                <CustomSelect
                  options={priceRanges}
                  label="Price Range"
                  selectedOption={priceRange}
                  onChange={setPriceRange}
                />
              </div>

              {/* Search Button */}
              <div className=" ">
                <button
                  type="submit"
                  className=" md:w-auto bg-indigo-500 text-white font-semibold py-3 px-10 text-lg rounded-xl hover:bg-indigo-600 shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Card List Section */}
      <section className="bg-gray-100 py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <CardList />
          </div>
        </div>
      </section>
    </>
  );
};

export default Properties;
