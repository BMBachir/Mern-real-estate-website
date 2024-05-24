import React from "react";
import CardList from "../components/CardList";
import { Input } from "@material-tailwind/react";
const Properties = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className=" bg-gray-100  py-12 md:py-20 lg:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Find Your Dream Home
            </h1>
            <p className="text-gray-500  text-lg md:text-xl">
              Search through our extensive list of properties to find the
              perfect fit for you.
            </p>
            <form className="flex items-center space-x-2 w-full max-w-md mx-auto">
              <Input
                className="rounded-lg py-3.5"
                placeholder="Search by location, property type, or price"
                type="text"
              />
              <button className="btn" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-gray-100  py-12 md:py-20 lg:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <CardList />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;
