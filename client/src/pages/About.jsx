import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import avatarImg from "../images/avatar.jpg";
import aboutImg from "../images/AboutPage.jpg";
import servicesImg from "../images/services.jpg";
const About = () => {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm ">
                  Real Estate
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Crafting Your Dream Home
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl ">
                  At Acme Real Estate, we're passionate about helping you find
                  or sell the perfect property. Our team of experienced agents
                  is dedicated to making your real estate journey seamless and
                  rewarding.
                </p>
              </div>
            </div>
            <img
              alt="Hero"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
              height="550"
              src={aboutImg}
              width="550"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 ">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm ">
                Our Story
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                A Legacy of Excellence
              </h2>
              <p className="mt-4 text-gray-500 ">
                Acme Real Estate was founded in 1985 with a simple mission: to
                provide exceptional real estate services to our community. Over
                the past three decades, we've grown to become one of the most
                trusted names in the industry, helping countless families and
                individuals find their dream homes.
              </p>
              <p className="mt-4 text-gray-500 ">
                Our success is built on a foundation of integrity, innovation,
                and unwavering commitment to our clients. We're proud to have
                established a reputation for excellence, and we're excited to
                continue our legacy of success in the years to come.
              </p>
            </div>
            <div>
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm ">
                Our Team
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Meet Our Experts
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col items-center space-y-2">
                  <img
                    alt="John Doe"
                    className="h-20 w-20 rounded-full object-cover"
                    height="80"
                    src={avatarImg}
                    style={{
                      aspectRatio: "80/80",
                      objectFit: "cover",
                    }}
                    width="80"
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Bachir Boubaidja</h3>
                    <p className="text-gray-500 ">Founder & CEO</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <img
                    alt="Jane Smith"
                    className="h-20 w-20 rounded-full object-cover"
                    height="80"
                    src={avatarImg}
                    style={{
                      aspectRatio: "80/80",
                      objectFit: "cover",
                    }}
                    width="80"
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Jane Smith</h3>
                    <p className="text-gray-500 ">Sales Manager</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <img
                    alt="Michael Johnson"
                    className="h-20 w-20 rounded-full object-cover"
                    height="80"
                    src={avatarImg}
                    style={{
                      aspectRatio: "80/80",
                      objectFit: "cover",
                    }}
                    width="80"
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Michael Johnson</h3>
                    <p className="text-gray-500 ">Property Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm ">
                Our Services
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Comprehensive Real Estate Solutions
              </h2>
              <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
                <li>
                  <CiCircleCheck className="mr-2 inline-block h-5 w-5 text-green-600" />
                  Residential and Commercial Property Sales
                </li>
                <li>
                  <CiCircleCheck className="mr-2 inline-block h-5 w-5 text-green-600" />
                  Property Rentals and Leasing
                </li>
                <li>
                  <CiCircleCheck className="mr-2 inline-block h-5 w-5 text-green-600" />
                  Property Management Services
                </li>
                <li>
                  <CiCircleCheck className="mr-2 inline-block h-5 w-5 text-green-600" />
                  Investment Property Consulting
                </li>
                <li>
                  <CiCircleCheck className="mr-2 inline-block h-5 w-5 text-green-600" />
                  Mortgage and Financing Assistance
                </li>
                <li>
                  <CiCircleCheck className="mr-2 inline-block h-5 w-5 text-green-600" />
                  Home Staging and Renovation Advice
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center space-y-4 text-green-600">
              <img
                alt="Services"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                height="310"
                src={servicesImg}
                width="550"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
