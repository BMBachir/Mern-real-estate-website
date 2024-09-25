import React from "react";
import { GoHome } from "react-icons/go";
import { FaRegBuilding } from "react-icons/fa";
import { LiaMapMarkedSolid } from "react-icons/lia";
import { IoIosArrowRoundUp } from "react-icons/io";
import { FiActivity } from "react-icons/fi";
import CardList from "../components/CardList";
import homeImg from "../images/home.png";
import aboutImg from "../images/aboutImg.jpg";
import avatarImg from "../images/avatar.jpg";
import { MdSearch } from "react-icons/md";
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
import { useRef } from "react";
import { Button } from "@material-tailwind/react";
const Home = () => {
  const headPage = useRef();

  const moveDown = () => {
    headPage.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="">
      <div className="fixed bottom-8 right-8">
        <div
          onClick={moveDown}
          className="cursor-pointer bg-gray-900 p-2 rounded-full "
        >
          <IoIosArrowRoundUp size={30} color="white" />
        </div>
      </div>

      {/**************************************************************** */}

      <section className="relative w-full rounded-b-[65px] bg-gray-100 h-[800px] overflow-hidden ">
        {/* Image part */}
        <div className="absolute bottom-0 bg-gray-900 h-[125px] w-full"></div>

        <div className="flex gap-52 mt-16 justify-between ">
          <div className="mt-20 ml-28 z-50">
            <img src={homeImg} alt="" className="" />
          </div>
          <div className="mt-28 relative z-10">
            <h1 className="font-Montserrat font-extrabold text-4xl text-right text-gray-900 mr-20">
              Designing Dreams
            </h1>

            <h1 className="font-Montserrat font-extrabold text-8xl text-right text-gray-900 mr-20">
              YOUR <br /> DREAM HOME
            </h1>
            <p className="mt-2 text-2xl text-right text-gray-700 mr-20">
              Find the ideal property to buy, sell, or rent with ease. <br />
              Start your real estate journey with us!
            </p>
            <Button className="px-12 py-3 mt-[80px] ml-[444px] rounded-2xl shadow-lg bg-[#9e948a] transition duration-300 text-sm -tracking-tighter">
              Start Book
            </Button>
            <div className="flex gap-16 text-gray-400 mt-5 ">
              <p className="">Algeria, Algiers</p>
              <p className="">boubaidjabachir3@gmail.com</p>
              <p className="">+213 675327207</p>
            </div>
          </div>
        </div>
      </section>

      {/**************************************************************** */}
      <section className="py-12 md:py-16 lg:py-20 mt-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
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

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <img
            alt="Hero Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
            height="600"
            src={aboutImg}
            width="800"
          />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Our Real Estate Company
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We are a leading real estate company dedicated to providing
              exceptional service and helping our clients achieve their property
              goals. With years of experience and a team of knowledgeable
              professionals, we strive to make the real estate process seamless
              and rewarding.
            </p>
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
          <div className="image_wrapper">
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
