import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import {
  Checkbox,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  IconButton,
  Select,
  Option,
  Button,
  Tabs,
  TabsHeader,
  Tab,
  Input,
} from "@material-tailwind/react";

import Pagination from "@mui/material/Pagination";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { RiParkingBoxFill } from "react-icons/ri";
import { MdChair } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { LuSlidersHorizontal } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FiHome, FiMap, FiDollarSign } from "react-icons/fi";
const Properties = () => {
  const navigate = useNavigate();
  // State for form values

  const [sideBarData, setSideBarData] = useState({
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [listings, setListings] = useState([]); // Initialize as empty array
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch listings from API
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);

      const res = await fetch("/api/listing/get");
      const data = await res.json();
      if (data.success === false) {
        res.status(500).console.log(data.message);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const handelChange = (e) => {
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSideBarData({
        ...sideBarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSideBarData({ ...sideBarData, sort, order });
    }
  };

  const filteredListings = listings.filter((listing) => {
    // Check if the listing type matches the filter
    const typeMatch =
      sideBarData.type === "all" || listing.type === sideBarData.type;

    // Check if parking matches the filter
    const parkingMatch =
      !sideBarData.parking || listing.parking === sideBarData.parking;

    // Check if furnished matches the filter
    const furnishedMatch =
      !sideBarData.furnished || listing.furnished === sideBarData.furnished;

    // Check if offer matches the filter
    const offerMatch =
      !sideBarData.offer || listing.offer === sideBarData.offer;

    // Apply all filters (AND logic)
    return (
      (listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      typeMatch &&
      parkingMatch &&
      furnishedMatch &&
      offerMatch
    );
  });

  const itemsPerPage = 9; // Set items per page to 9
  const [current, setCurrent] = useState(1);

  // Calculate the total number of pages based on items per page
  const NbPage = Math.ceil(filteredListings.length / itemsPerPage);

  // Calculate start and end indices for slicing the data
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the listings to get only the data for the current page
  const DataPerPage = filteredListings.slice(startIndex, endIndex);

  // Handle pagination change
  const handlePaginationChange = (event, value) => {
    setCurrent(value);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 relative">
        <header className="bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-primary mb-2 tracking-tight sm:text-5xl md:text-6xl">
                Find Your Dream Home
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the perfect property that matches your lifestyle and
                aspirations.
              </p>
            </div>

            <Tabs value={sideBarData.type}>
              <TabsHeader className="mb-6">
                <Tab
                  value="all"
                  onClick={() =>
                    setSideBarData({ ...sideBarData, type: "all" })
                  }
                >
                  All
                </Tab>
                <Tab
                  value="rent"
                  onClick={() =>
                    setSideBarData({ ...sideBarData, type: "rent" })
                  }
                >
                  Rent
                </Tab>
                <Tab
                  value="sell"
                  onClick={() =>
                    setSideBarData({ ...sideBarData, type: "sell" })
                  }
                >
                  Sale
                </Tab>
              </TabsHeader>
            </Tabs>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow group">
                <Input
                  type="text"
                  color="gray"
                  placeholder="Enter property name, or keywords..."
                  value={searchTerm}
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  containerProps={{ className: "min-w-[100px]" }}
                  className="!border px-10 !border-gray-400 rounded-full text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                />

                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>
              <Button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                variant="outline"
                className="rounded-full px-6 py-3 flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out"
              >
                <LuSlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="flex justify-center space-x-6 text-sm mt-7">
              <span className="flex items-center gap-1 text-muted-foreground">
                <FiHome className="h-5 w-5 mr-2 text-primary" />{" "}
                {listings.length}
                <span>Listings</span>
              </span>
              <span className="flex items-center text-muted-foreground">
                <FiMap className="h-5 w-5 mr-2 text-primary" /> Around The Word
              </span>
              <span className="flex items-center text-muted-foreground">
                <FiDollarSign className="h-5 w-5 mr-2 text-primary" /> Best
                Price Guarantee
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DataPerPage.map((listing) => (
              <Card
                key={listing._id}
                className="w-full max-w-[26rem] shadow-lg flex flex-col"
              >
                <CardHeader floated={false} color="blue-gray">
                  <img
                    className="rounded-xl h-56 w-full object-cover"
                    src={listing.imageUrls[0]}
                    alt={listing.name}
                  />
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
                  <IconButton
                    size="sm"
                    color="red"
                    variant="text"
                    className="!absolute top-4 right-8 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </IconButton>
                </CardHeader>

                <CardBody className="flex-grow flex flex-col justify-between">
                  <div className="mb-3">
                    <div className="flex items-center justify-between">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {listing.name}
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="-mt-0.5 h-5 w-5 text-yellow-700"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {listing.rating || 5.0}
                      </Typography>
                    </div>

                    <Typography
                      color="gray"
                      className="flex items-start gap-6 mb-2"
                    >
                      <div className="flex items-center gap-4">
                        <FaBath />
                        <div className="text_para">
                          {listing.bathrooms} Bath
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <FaBed />
                        <div className="text_para">
                          {listing.bedrooms} Bedrooms
                        </div>
                      </div>
                    </Typography>

                    <Typography color="gray">{listing.description}</Typography>
                  </div>

                  <div className="group  inline-flex flex-wrap items-center gap-3">
                    <Tooltip
                      content={`$${listing.regularPrice.toLocaleString()} ${
                        listing.type === "rent" ? "per month" : ""
                      }`}
                    >
                      <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                        <MdAttachMoney className="h-5 w-5" />
                      </span>
                    </Tooltip>
                    <Tooltip content="Parking">
                      <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                        <RiParkingBoxFill className="h-5 w-5" />
                      </span>
                    </Tooltip>
                    <Tooltip content={`${listing.furnished} Furnished`}>
                      <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                        <MdChair className="h-5 w-5" />
                      </span>
                    </Tooltip>
                  </div>
                </CardBody>

                <CardFooter>
                  <Button size="lg" fullWidth={true}>
                    <Link to={`/listing/${listing._id}`}>Reserve</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="w-full bottom-2 flex items-center justify-center gap-4 mt-20 mb-20">
            {" "}
            <div className="flex items-center gap-2">
              <Pagination
                count={NbPage}
                page={current}
                onChange={handlePaginationChange}
                variant="outlined"
                size="large"
              />
            </div>
          </div>
        </main>

        {/* Filter Sidebar */}
        <aside
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
            isFilterOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <form className="h-full flex flex-col">
            <div className="p-6">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() => setIsFilterOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-semibold mb-6 mt-6">
                Filter Properties
              </h2>

              <div className="space-y-6">
                <div className="relative w-full mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>

                  <div className="flex items-center">
                    <Checkbox
                      id="offer"
                      type="checkbox"
                      label="Offer"
                      name="offer"
                      onChange={handelChange}
                      checked={sideBarData.offer}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <div className="flex items-center mb-2">
                    <Checkbox
                      id="parking"
                      type="checkbox"
                      label="Parking"
                      name="parking"
                      onChange={handelChange}
                      checked={sideBarData.parking}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="furnished"
                      type="checkbox"
                      name="furnished"
                      label="Furnished"
                      onChange={handelChange}
                      checked={sideBarData.furnished}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort by
                  </label>
                  <Select
                    id="sort"
                    label="Select sort"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                    name="sort"
                    onChange={handelChange}
                    value={sideBarData.sort}
                  >
                    <Option value="price-high-to-low">Price high to low</Option>
                    <Option value="price-low-to-high">Price low to high</Option>
                  </Select>
                </div>
              </div>
            </div>
          </form>
        </aside>
      </div>
    </>
  );
};

export default Properties;
