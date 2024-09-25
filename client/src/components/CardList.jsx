import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { FaBath } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { RiParkingBoxFill } from "react-icons/ri";
import { MdChair } from "react-icons/md";
import { Link } from "react-router-dom";
const CardList = () => {
  const [listings, setListings] = useState([]); // Initialize as empty array

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const itemsPerPage = 3; // Set items per page to 9
  const [current, setCurrent] = useState(1);

  // Calculate the total number of pages based on items per page
  const NbPage = Math.ceil(listings.length / itemsPerPage);

  // Calculate start and end indices for slicing the data
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the listings to get only the data for the current page
  const DataPerPage = listings.slice(startIndex, endIndex);

  return (
    <>
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

              <Typography color="gray" className="flex items-start gap-6 mb-2">
                <div className="flex items-center gap-4">
                  <FaBath />
                  <div className="text_para">{listing.bathrooms} Bath</div>
                </div>
                <div className="flex items-center gap-4">
                  <FaBed />
                  <div className="text_para">{listing.bedrooms} Bedrooms</div>
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
    </>
  );
};

export default CardList;
