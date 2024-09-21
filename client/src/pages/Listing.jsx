import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import { IoIosShareAlt } from "react-icons/io";
import { FaBath } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaSquareParking } from "react-icons/fa6";
import { MdChair } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
const Listing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(false);
  const [copied, setCopied] = useState(false);

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
  return (
    <main>
      {loading && "Loading..."}
      {error && "Something went wrong"}
      {listing && !loading && !error && (
        <div className="relative">
          <Swiper
            navigation
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} w-4 h-4 bg-white rounded-full mx-1"></span>`;
              },
            }}
          >
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-center bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url(${url})`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Share Icon */}
          <div className="absolute top-4 right-4 z-50 rounded-full bg-white p-3 shadow-md">
            <IoIosShareAlt
              className="text-gray-700 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
              }}
            />
          </div>

          {/* Notification for copying the link */}
          {copied && (
            <div className="absolute top-16 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
              Link copied!
            </div>
          )}

          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{listing.name}</h1>

                    <p className="text-gray-600 flex items-center gap-2 mb-4">
                      {" "}
                      <IoLocationSharp /> <p>{listing.address}</p>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
                        for {listing.type}
                      </span>

                      {listing.offer ? (
                        <span className="bg-green-200 text-gray-700 px-2 py-1 rounded-md">
                          Discount
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-gray-700 text-white py-2 px-4 rounded-md">
                    Contact Agent
                  </button>
                </div>
                <p className="text-gray-700 mb-6">
                  {" "}
                  <span className="font-bold">Description :</span>{" "}
                  {listing.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FaBed className="text-gray-600" />
                    <span>{listing.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBath className="text-gray-600" />
                    <span>{listing.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdChair className="text-gray-600" />
                    <span>
                      {listing.furnished ? "Furnished" : "Not Furnished"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaSquareParking className="text-gray-600" />
                    <span>{listing.parking ? "Parking" : "No Parking"}</span>
                  </div>
                </div>
                <div className="mb-6 flex ">
                  <p className=" text-xl bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
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
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
