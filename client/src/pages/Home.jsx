import React from "react";
import { GoHome } from "react-icons/go";
import { FaRegBuilding } from "react-icons/fa";
import { LiaMapMarkedSolid } from "react-icons/lia";
import { IoIosArrowRoundUp } from "react-icons/io";
import { FiActivity } from "react-icons/fi";
import CardList from "../components/CardList";
import homeImg from "../images/home.png";
import ChooseUs from "../images/ChooseUs.png";
import avatarImg from "../images/avatar.jpg";
import Marquee from "react-fast-marquee";
import p1 from "../images/companies/one.png";
import p2 from "../images/companies/two.png";
import p3 from "../images/companies/three.png";
import p4 from "../images/companies/four.png";
import p5 from "../images/companies/five.png";
import p6 from "../images/companies/six.png";
import p7 from "../images/companies/seven.png";
import p8 from "../images/companies/eight.png";
import p9 from "../images/companies/nine.png";
import p10 from "../images/companies/ten.png";
import "@fontsource/montserrat/400.css";
import "@fontsource/pacifico/400.css";
import { DollarSign, TrendingUp, Users } from "lucide-react";
import { Button } from "@material-tailwind/react";

const Home = () => {
  return (
    <div className="">
      {/**************************************************************** */}

      <section className="relative w-full rounded-b-[45px] bg-gray-100 h-[630px] md:h-[800px] overflow-hidden">
        {/* Image part */}
        <div className="absolute bottom-0 bg-gray-200 h-[80px] md:h-[125px] w-full"></div>

        <div className="flex flex-col items-center sm:flex-row gap-52 mt-16 justify-between">
          {/* Hide image on small screens */}
          <div className="mt-20 ml-28 z-50 hidden sm:block">
            <img src={homeImg} alt="" className="" />
          </div>
          <div className="mt-28 relative z-10 text-center sm:text-right px-4 sm:px-0">
            <h1 className="font-Montserrat font-extrabold text-3xl mb-2 md:mb-2 md:text-4xl md:mr-24 text-gray-900 ">
              Designing Dreams
            </h1>

            <h1 className="font-Montserrat font-extrabold text-6xl mb-3 md:text-8xl md:mr-24 text-gray-900 ">
              YOUR <br /> DREAM HOME
            </h1>
            <p className="mt-2 text-lg sm:text-2xl text-gray-700 md:mr-24">
              Find the ideal property to buy, sell, or rent with ease. <br />
              Start your real estate journey with us!
            </p>
            <Button className=" mt-10 px-12 py-2 md:mr-24 md:mt-[65px] hover:scale-105 font-normal lowercase transition duration-300 text-md -tracking-tighter">
              Start Book
            </Button>
          </div>
        </div>
      </section>

      {/**************************************************************** */}

      {/**************************************************************** */}
      <section className="py-12 md:py-16 lg:py-20 mt-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className=" text-gray-900 font-bold tracking-tight text-4xl md:text-5xl">
              Featured Listings
            </h2>
            <p className="mt-4 text-gray-500">
              Discover the best properties on the market.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardList />
          </div>
        </div>
      </section>

      <section className="w-full mt-16 py-12 md:py-24 lg:py-32 bg-gray-200 text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-gray-900">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Why You Should Choose KriDar Estates?
              </h2>
              <p className="text-xl mb-6">
                Discover your dream property with KriDar Estates, offering
                top-tier real estate services with a commitment to trust, value,
                and personalized solutions.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  <span>
                    Increased property value with eco-friendly features
                  </span>
                </li>
                <li className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  <span>Lower utility costs and potential tax incentives</span>
                </li>
                <li className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  <span>
                    Join a community of environmentally conscious homeowners
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                alt="Eco-friendly home"
                src={ChooseUs}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Great Services
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover the perfect property for you with our comprehensive
                real estate services.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:gap-10">
            <div className="mx-auto w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <GoHome className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Residential Properties
              </h3>
              <p className="text-sm text-gray-400">
                Explore a wide range of single-family homes, condos, and
                townhouses to find your perfect living space.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <FaRegBuilding className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Commercial Properties
              </h3>
              <p className="text-sm text-gray-400">
                Discover a range of commercial properties, including office
                spaces, retail locations, and industrial facilities.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <LiaMapMarkedSolid className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Land and Lots</h3>
              <p className="text-sm text-gray-400">
                Explore a variety of land and lot options, perfect for building
                your dream home or investment property.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <FiActivity className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Investment Properties
              </h3>
              <p className="text-sm text-gray-400">
                Discover lucrative investment opportunities, from rental
                properties to fixer-uppers, to grow your real estate portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center ">
          <div className="space-y-3 space-x-5 text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Technology Investors
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 text-xl/relaxed dark:text-gray-400">
              Discover the perfect property for you with our comprehensive real
              estate services.
            </p>
          </div>
        </div>

        <Marquee gradient pauseOnHover>
          <div className="image_wrapper ">
            <img src={p1} alt="" />
          </div>

          <div className="image_wrapper">
            <img src={p2} alt="" />
          </div>

          <div className="image_wrapper">
            <img src={p3} alt="" />
          </div>

          <div className="image_wrapper">
            <img src={p4} alt="" />
          </div>

          <div className="image_wrapper">
            <img src={p5} alt="" />
          </div>

          <div className="image_wrapper">
            <img src={p6} alt="" />
          </div>

          <div className="image_wrapper">
            <img src={p7} alt="" />
          </div>

          <div className="image_wrapper">
            <img src={p8} alt="" />
          </div>

          <div className="image_wrapper">
            <img src={p9} alt="" />
          </div>

          <div className="image_wrapper">
            <img src={p10} alt="" />
          </div>
        </Marquee>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="  space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our Clients Say
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed">
              Hear from our satisfied clients about their experience working
              with us.
            </p>
          </div>
          <div className="mt-10">
            <div className="relative ">
              <div className="flex space-x-12 overflow-x-auto scrollbar-hide">
                <div className="flex-none rounded-lg bg-gray-100 p-6 w-[400px]">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                      <img
                        alt="John Doe"
                        className="h-full w-full object-cover"
                        src={avatarImg}
                      />
                    </div>
                    <div>
                      <div className="font-semibold">John Snow</div>
                      <div className="text-sm text-gray-500">Homeowner</div>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-lg font-semibold  md:text-xl">
                    “The team at Real Estate Pros were incredibly helpful and
                    made the home buying process a breeze. I highly recommend
                    them!”
                  </p>
                </div>
                <div className="flex-none snap-center rounded-lg bg-gray-100 p-6 w-[400px] ">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                      <img
                        alt="Jane Smith"
                        className="h-full w-full object-cover"
                        src={avatarImg}
                      />
                    </div>
                    <div>
                      <div className="font-semibold">will smith</div>
                      <div className="text-sm text-gray-500">Homeowner</div>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-lg font-semibold  md:text-xl">
                    “I was impressed by the attention to detail and
                    professionalism of the Real Estate Pros team. They made the
                    entire process seamless.”
                  </p>
                </div>
                <div className="flex-none snap-center rounded-lg bg-gray-100 p-6 w-[400px]">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                      <img
                        alt="Michael Johnson"
                        className="h-full w-full object-cover"
                        src={avatarImg}
                      />
                    </div>
                    <div>
                      <div className="font-semibold">dames favela</div>
                      <div className="text-sm text-gray-500">Homeowner</div>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-lg font-semibold  md:text-xl">
                    “I was blown away by the level of service and expertise from
                    the Real Estate Pros team. They truly went above and
                    beyond.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
