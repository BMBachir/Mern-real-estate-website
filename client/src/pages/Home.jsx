import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { FiBriefcase } from "react-icons/fi";
import CardList from "../components/CardList";
import homeImg from "../images/home.jpg";
import aboutImg from "../images/aboutus.jpg";
const Home = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[80vh] overflow-hidden">
        <img alt="Hero Image" className="absolute " src={homeImg} />
        <div className="absolute inset-0 bg-gray-900/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find Your Dream Home
          </h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl">
            Discover the perfect property for you with our comprehensive real
            estate search.
          </p>
          <div className="mt-8 w-full max-w-md">
            <form className="flex items-center rounded-md bg-white shadow-lg">
              <input
                className="flex-1 rounded-l-md border-none px-4 py-3 text-gray-700 focus:outline-none focus:ring-0"
                placeholder="Search for properties"
                type="text"
              />
              <button
                className="rounded-r-md bg-primary-500 px-4 py-3 text-white hover:bg-primary-600 focus:outline-none focus:ring-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Listings
            </h2>
            <p className="mt-4 text-gray-500">
              Discover the best properties on the market.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CardList />
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                About Us
              </h2>
              <p className="mt-4 text-gray-500">
                We are a leading real estate company dedicated to helping you
                find your dream home. With years of experience and a team of
                knowledgeable agents, we are committed to providing exceptional
                service and finding the perfect property for you.
              </p>
              <button className="mt-6" variant="primary">
                Learn More
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-gray-500">
              We offer a wide range of services to meet your real estate needs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-md shadow-lg">
              <div className="p-4">
                <IoHomeOutline className="h-8 w-8 text-primary-500" />
                <h3 className="mt-4 text-lg font-bold">Property Listing</h3>
                <p className="mt-2 text-gray-500">
                  List your property with us and reach a wide audience of
                  potential buyers.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-md shadow-lg">
              <div className="p-4">
                <IoSearchOutline className="h-8 w-8 text-primary-500" />
                <h3 className="mt-4 text-lg font-bold">Property Search</h3>
                <p className="mt-2 text-gray-500">
                  Find your dream home with our comprehensive property search
                  tools.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-md shadow-lg">
              <div className="p-4">
                <FiBriefcase className="h-8 w-8 text-primary-500" />
                <h3 className="mt-4 text-lg font-bold">
                  Real Estate Consulting
                </h3>
                <p className="mt-2 text-gray-500">
                  Get expert advice and guidance from our experienced real
                  estate consultants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-gray-500">
              Hear from our satisfied clients about their experience with us.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-md shadow-lg">
              <div className="p-4">
                <div className="flex items-center">
                  <img
                    alt="Client 1"
                    className="h-12 w-12 rounded-full object-cover"
                    src="/placeholder.svg"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">John Doe</h4>
                    <p className="text-gray-500">Homeowner</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">
                  "The team at this real estate company was incredibly helpful
                  and made the process of buying my first home a breeze. I
                  highly recommend them to anyone looking to purchase a
                  property."
                </p>
              </div>
            </div>
            <div className="bg-white rounded-md shadow-lg">
              <div className="p-4">
                <div className="flex items-center">
                  <img
                    alt="Client 2"
                    className="h-12 w-12 rounded-full object-cover"
                    src="/placeholder.svg"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Jane Smith</h4>
                    <p className="text-gray-500">Investor</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">
                  "I've worked with this real estate company for several years
                  and they've always provided excellent service and helped me
                  find great investment properties. I highly recommend them to
                  anyone looking to invest in real estate."
                </p>
              </div>
            </div>
            <div className="bg-white rounded-md shadow-lg">
              <div className="p-4">
                <div className="flex items-center">
                  <img
                    alt="Client 3"
                    className="h-12 w-12 rounded-full object-cover"
                    src="/placeholder.svg"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Michael Johnson</h4>
                    <p className="text-gray-500">Homeowner</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">
                  "I was incredibly impressed with the level of service and
                  attention to detail provided by this real estate company. They
                  helped me find the perfect home for my family and made the
                  entire process stress-free."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
