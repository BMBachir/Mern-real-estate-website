import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/swiper-bundle.css"; // Ensure this is imported if using Swiper v6 or earlier

import { IoIosShareAlt } from "react-icons/io";
import { FaBath } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaSquareParking } from "react-icons/fa6";
import { MdChair } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { MdWavingHand } from "react-icons/md";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

const Listing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const { currentUser } = useSelector((state) => state.user);
  SwiperCore.use([Navigation, Pagination]);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
        } else {
          setListing(data);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);
  console.log(listing);

  const offer = listing?.regularPrice - listing?.discountPrice;
  console.log(listing.imageUrls);
  return (
    <main className="mt-[150px]">
      {loading && "Loading..."}
      {error && "Something went wrong"}
      {listing && !loading && !error && (
        <div className="relative">
          <div className="">
            {" "}
            {/* Share Icon */}
            <div className="fixed bottom-4 right-4 z-50 rounded-full  transition-transform transform hover:scale-105 bg-indigo-500 p-4 shadow-lg">
              <IoIosShareAlt
                className="text-white text-lg cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 3000);
                }}
              />
            </div>
            {/* Notification for copying the link */}
            {copied && (
              <div className="fixed bottom-20 right-4 z-50 bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md">
                Link copied!
              </div>
            )}
          </div>

          <div className="grid grid-cols-1  2xl items-center justify-center gap-10 mb-10 mt-10 containerListingPage">
            <div className="w-full h-auto min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] bg-center bg-no-repeat bg-cover">
              <Swiper
                className="rounded-lg"
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                scrollbar={{ draggable: true }}
              >
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className="w-full h-auto min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[500px] xl:min-h-[700px] bg-center bg-no-repeat bg-cover"
                      style={{
                        backgroundImage: `url(${url})`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="px-4 py-8 w-full max-w-[1200px] mx-auto">
              <div className="bg-white shadow-md rounded-lg ">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start space-y-3 md:space-y-0 ">
                    <div className=" space-y-7">
                      <h1 className="text-3xl font-bold mb-2">
                        {listing.name}
                      </h1>
                      <p className="text-gray-600 flex items-center gap-2 mb-4">
                        <IoLocationSharp /> <p>{listing.address}</p>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-200 text-gray-700 px-7 py-1 rounded-md">
                          {listing.type === "rent" ? "For Rent" : "For Sale"}
                        </span>
                        {listing.offer && (
                          <span className="bg-green-200 text-green-900 px-7 py-1 rounded-md">
                            ${offer.toLocaleString()} Off
                          </span>
                        )}
                      </div>
                    </div>
                    {!currentUser ? (
                      <div className="">
                        <Button onClick={handleOpen}>contact landloard</Button>
                        <Dialog open={open} handler={handleOpen}>
                          <DialogHeader>
                            <Typography variant="h5" color="blue-gray">
                              Attention Required
                            </Typography>
                          </DialogHeader>
                          <DialogBody
                            divider
                            className="grid place-items-center gap-4"
                          >
                            <MdWavingHand className="text-9xl text-gray-900 waving-hand" />
                            <Typography
                              className="text-gray-900 text-center"
                              variant="h4"
                            >
                              Hey !! <br />
                              Sign in to contact
                            </Typography>
                            <Typography className="text-center font-normal">
                              You cannot contact the landlord because you are
                              not signed in. <br /> Please sign in to proceed.
                            </Typography>
                          </DialogBody>
                          <DialogFooter className="space-x-2">
                            <Button
                              variant="text"
                              color="blue-gray"
                              onClick={handleOpen}
                            >
                              Not now
                            </Button>
                            <Button variant="gradient" onClick={handleOpen}>
                              <Link to={"/sign-in"}>Ok, I will</Link>
                            </Button>
                          </DialogFooter>
                        </Dialog>
                      </div>
                    ) : currentUser._id === listing.userRef ? (
                      <div className="mt-6">
                        <Button className=" transition-transform transform hover:scale-105 duration-300 ease-in-out">
                          You are the owner
                        </Button>
                      </div>
                    ) : (
                      <div className="">
                        {" "}
                        <Button
                          onClick={() => setContact(true)}
                          className="m transition-transform transform hover:scale-105 duration-300 ease-in-out"
                        >
                          contact landlord
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 mb-6 mt-3 ">
                    <span className="font-bold">Description :</span>{" "}
                    {listing.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 ">
                    <div className="flex items-center gap-2">
                      <FaBed className="text-gray-600" />
                      <span>{listing.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBath className="text-gray-600" />
                      <span>{listing.bathrooms} Baths</span>
                    </div>

                    {listing.furnished ? (
                      <div className="flex items-center gap-2">
                        <MdChair className="text-gray-600" />
                        <span>Furnished</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <MdChair className="text-red-600" />
                        <span className="text-red-600"> Not furnished</span>
                      </div>
                    )}

                    {listing.parking ? (
                      <div className="flex items-center gap-2">
                        <FaSquareParking className="text-gray-600" />
                        <span>Parking </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FaSquareParking className="text-red-600" />
                        <span className="text-red-600">No parking </span>
                      </div>
                    )}
                  </div>
                  <div className="mb-6 flex">
                    <p className="text-xl bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
                      {listing.offer ? (
                        <>
                          {listing.type === "rent" ? (
                            <div className="flex items-center gap-1">
                              ${listing.discountPrice.toLocaleString()}
                              {listing.regularPrice > listing.discountPrice && (
                                <span className="text-gray-500 line-through ml-2">
                                  ${listing.regularPrice.toLocaleString()}
                                </span>
                              )}
                              <p>/ month </p>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              ${listing.discountPrice.toLocaleString()}
                              {listing.regularPrice > listing.discountPrice && (
                                <span className="text-gray-500 line-through ml-2">
                                  ${listing.regularPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-500 ml-2">
                          ${listing.regularPrice.toLocaleString()}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                {contact && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 rounded-lg">
                    {/* Background Overlay with Blur */}
                    <div
                      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                      onClick={() => setContact(false)} // Clicking outside will close the modal
                    ></div>

                    {/* Popup Content */}
                    <div className="w-full max-w-lg p-8 relative">
                      {/* Contact Component */}
                      <div className="bg-gray-100 rounded-lg">
                        <Contact listing={listing} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
