import React from "react";
import { useSelector } from "react-redux";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="w-full max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 ring-2 ring-primary rounded-full overflow-hidden">
            <img
              src={
                currentUser.avatar ||
                "https://img.freepik.com/vecteurs-premium/icone-compte-icone-utilisateur-graphiques-vectoriels_292645-552.jpg"
              }
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              {currentUser.username}
            </h1>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 text-xs rounded">
              Top Seller
            </span>
          </div>
          <p className="text-gray-500">
            Experienced real estate agent with a passion for helping clients
            find their dream homes.
          </p>
        </div>
      </div>
      <div className="my-8 md:my-12 border-t border-gray-300" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Listings</h2>
          <div className="space-y-4">
            <div className="border rounded-md overflow-hidden">
              <div className="p-4 flex items-center gap-4">
                <img
                  src="/placeholder.svg"
                  width={100}
                  height={100}
                  alt="Property Image"
                  className="rounded-md"
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    Charming Townhouse in Downtown
                  </h3>
                  <p className="text-gray-500">
                    3 Beds | 2 Baths | 1,500 sq ft
                  </p>
                  <p className="text-yellow-500 font-medium">$450,000</p>
                </div>
              </div>
              <div className="border-t">
                <button className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm">
                  View Listing
                </button>
              </div>
            </div>
            <div className="border rounded-md overflow-hidden">
              <div className="p-4 flex items-center gap-4">
                <img
                  src="/placeholder.svg"
                  width={100}
                  height={100}
                  alt="Property Image"
                  className="rounded-md"
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    Spacious Family Home with Pool
                  </h3>
                  <p className="text-gray-500">
                    4 Beds | 3 Baths | 2,200 sq ft
                  </p>
                  <p className="text-yellow-500 font-medium">$650,000</p>
                </div>
              </div>
              <div className="border-t">
                <button className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm">
                  View Listing
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Sold Properties</h2>
          <div className="space-y-4">
            <div className="border rounded-md overflow-hidden">
              <div className="p-4 flex items-center gap-4">
                <img
                  src="/placeholder.svg"
                  width={100}
                  height={100}
                  alt="Property Image"
                  className="rounded-md"
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    Cozy Bungalow in the Suburbs
                  </h3>
                  <p className="text-gray-500">2 Beds | 1 Bath | 1,200 sq ft</p>
                  <p className="text-yellow-500 font-medium">$325,000</p>
                </div>
              </div>
              <div className="border-t p-2">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <CiCalendar className="w-4 h-4" />
                  <span>Sold on May 15, 2023</span>
                </div>
              </div>
            </div>
            <div className="border rounded-md overflow-hidden">
              <div className="p-4 flex items-center gap-4">
                <img
                  src="/placeholder.svg"
                  width={100}
                  height={100}
                  alt="Property Image"
                  className="rounded-md"
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    Luxury Penthouse in the City
                  </h3>
                  <p className="text-gray-500">
                    3 Beds | 2 Baths | 1,800 sq ft
                  </p>
                  <p className="text-yellow-500 font-medium">$850,000</p>
                </div>
              </div>
              <div className="border-t p-2">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <CiCalendar className="w-4 h-4" />
                  <span>Sold on March 22, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="border rounded-md overflow-hidden">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <IoPhonePortraitOutline className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">(123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MdOutlineEmail className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">john.doe@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MdMyLocation className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="text-gray-500">Address</p>
                  <p className="font-medium">123 Main St, Anytown USA</p>
                </div>
              </div>
            </div>
            <div className="border-t">
              <button className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
