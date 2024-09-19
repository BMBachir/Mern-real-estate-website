import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import yourListing from "../images/yourListing.png";
import {
  Edit,
  Trash2,
  Search,
  Plus,
  LayoutGrid,
  List,
  DollarSign,
  Home,
  TrendingUp,
} from "lucide-react";
import { useSelector } from "react-redux";

const UserListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("Error: Expected an array of listings");
          setListings([]);
        } else {
          setListings(data);
        }
      } catch (error) {
        console.error("Error fetching listings:", error.message);
        setListings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [currentUser]);

  const filteredListings = listings.filter(
    (listing) =>
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("Filtered listings:", filteredListings);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center text-white py-20"
        style={{
          backgroundImage: `url(${yourListing})`,
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl text-black font-bold mb-4">
            Manage Your Real Estate Listings
          </h1>
          <div className="relative ">
            <input
              type="text"
              placeholder="Search listings..."
              className="shadow-md w-full py-3 pl-10 pr-4 text-gray-700 bg-white rounded-full focus:outline-none focus:shadow-outline"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <Home className="h-10 w-10 text-blue-600" />
              <div>
                <p className="text-2xl font-semibold">{listings.length}</p>
                <p className="text-gray-600">Total Listings</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <DollarSign className="h-10 w-10 text-green-600" />
              <div>
                <p className="text-2xl font-semibold">
                  $
                  {listings
                    .reduce((sum, listing) => sum + listing.discountPrice, 0)
                    .toLocaleString()}
                </p>
                <p className="text-gray-600">Total Value</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <TrendingUp className="h-10 w-10 text-purple-600" />
              <div>
                <p className="text-2xl font-semibold">
                  $
                  {Math.round(
                    listings.reduce(
                      (sum, listing) => sum + listing.discountPrice,
                      0
                    ) / listings.length
                  ).toLocaleString()}
                </p>
                <p className="text-gray-600">Average Price</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Your Listings</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-gray-200" : ""
                }`}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-gray-200" : ""
                }`}
              >
                <List className="h-5 w-5" />
              </button>
              <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {filteredListings.map((listing) => (
                <motion.div
                  key={listing._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {listing.imageUrls.length > 0 ? (
                    <img
                      src={listing.imageUrls[0]} // Display the first image from the array
                      alt={listing.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <p>No Image Available</p>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{listing.name}</h3>
                    <p className="text-gray-600 mt-2">
                      {listing.offer ? (
                        <>
                          ${listing.discountPrice.toLocaleString()}
                          {listing.regularPrice > listing.discountPrice && (
                            <span className="text-gray-500 line-through ml-2">
                              ${listing.regularPrice.toLocaleString()}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-500 ml-2">
                          ${listing.regularPrice.toLocaleString()}
                        </span>
                      )}
                    </p>
                    <p className="text-gray-600 mt-2">{listing.description}</p>
                    <p className="text-gray-600 mt-2">
                      <strong>Address:</strong> {listing.address}
                    </p>
                    <p className="text-gray-600 mt-2">
                      <strong>Bedrooms:</strong> {listing.bedrooms}
                    </p>
                    <p className="text-gray-600 mt-2">
                      <strong>Furnished:</strong>{" "}
                      {listing.furnished ? "Yes" : "No"}
                    </p>
                    <div className="mt-4 flex space-x-4">
                      <button className="text-blue-600 hover:underline">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:underline">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserListings;
