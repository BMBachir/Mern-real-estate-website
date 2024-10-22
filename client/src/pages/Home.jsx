import React, { lazy, Suspense } from "react";
import { GoHome } from "react-icons/go";
import { FaRegBuilding } from "react-icons/fa";
import { LiaMapMarkedSolid } from "react-icons/lia";
import { FiActivity } from "react-icons/fi";
import homeImg from "../images/hero.webm";
import ChooseUs from "../images/ChooseUs.png";
import avatarImg from "../images/avatar.jpg";
import "@fontsource/montserrat/400.css";
import "@fontsource/pacifico/400.css";
import { DollarSign, TrendingUp, Users } from "lucide-react";

const CardList = lazy(() => import("../components/CardList"));
const Home = () => {
  return (
    <div className="">
      {/**************************************************************** */}

      <section>
        {/* Video part */}
        <div className="w-full rounded-b-[30px] md:rounded-b-[50px] bg-gray-100 h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[75vh] overflow-hidden">
          <video
            className="w-full h-full object-cover"
            src={homeImg}
            autoPlay
            loop
            muted
          />
        </div>

        <div className="flex flex-col items-center px-5 md:flex-row md:justify-between md:items-start md:px-10 py-5">
          <div className="mb-4 md:mb-0">
            <h1 className="text-[14px] md:text-[14px] lg:text-[60px] leading-snug md:leading-tight text-blue-gray-900 text-center md:text-left">
              Connect Buyers,
              <br /> Sellers & Renters in One
            </h1>
          </div>
          <p className="text-center md:text-left p-2 w-full md:w-[330px] lg:w-[550px] leading-tight text-[14px] md:text-[16px] lg:text-[18px]">
            Whether you're looking to buy, sell, or rent, our platform offers
            seamless connections between property owners and seekers. Explore
            listings, showcase your property, or find your next home—all in one
            convenient location.
          </p>
        </div>
      </section>

      <div className="relative h-16 mt-10">
        <div className="absolute inset-0 w-full h-full transform -skew-y-3 bg-gray-100"></div>
      </div>
      <div className="relative h-16 ">
        <div className="absolute inset-0 w-full h-full transform -skew-y-3 bg-gray-100"></div>
      </div>
      <section className="py-12 md:py-16 lg:py-20 mt-10">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className=" text-blue-gray-900 font-bold tracking-tight text-4xl md:text-5xl">
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

      <div className="relative h-16 mt-10">
        <div className="absolute inset-0 w-full h-full transform skew-y-3 bg-gray-100"></div>
      </div>
      <div className="relative h-16 ">
        <div className="absolute inset-0 w-full h-full transform skew-y-3 bg-gray-100"></div>
      </div>

      <section className="w-full mt-16 py-12  md:py-24 lg:py-32  text-primary-foreground">
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
            <div className="relative rounded-lg overflow-hidden">
              <img
                alt="Eco-friendly home"
                src={ChooseUs}
                layout="fill"
                loading="lazy"
                objectFit="cover"
                className="rounded-xl "
              />
            </div>
          </div>
        </div>
      </section>

      <div className="relative h-16 mt-10">
        <div className="absolute inset-0 w-full h-full transform -skew-y-3 bg-gray-100"></div>
      </div>
      <div className="relative h-16 ">
        <div className="absolute inset-0 w-full h-full transform -skew-y-3 bg-gray-100"></div>
      </div>

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

      <div className="relative h-16 mt-10">
        <div className="absolute inset-0 w-full h-full transform skew-y-3 bg-gray-100"></div>
      </div>
      <div className="relative h-16 ">
        <div className="absolute inset-0 w-full h-full transform skew-y-3 bg-gray-100"></div>
      </div>

      <div className="relative h-16 mt-10">
        <div className="absolute inset-0 w-full h-full transform -skew-y-3 bg-gray-100"></div>
      </div>
      <div className="relative h-16 ">
        <div className="absolute inset-0 w-full h-full transform -skew-y-3 bg-gray-100"></div>
      </div>
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
                        loading="lazy"
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
                        loading="lazy"
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
                        alt="Jane Smith"
                        loading="lazy"
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
      <div className="relative h-16 mt-10">
        <div className="absolute inset-0 w-full h-full transform skew-y-3 bg-gray-100"></div>
      </div>
      <div className="relative h-16">
        <div className="absolute inset-0 w-full h-full transform skew-y-3 bg-gray-100"></div>
      </div>
    </div>
  );
};

export default Home;
