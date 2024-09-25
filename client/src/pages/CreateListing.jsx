import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdImageNotSupported } from "react-icons/md";
import {
  Button,
  Checkbox,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { FaBath, FaBed } from "react-icons/fa";
import { MdPriceChange } from "react-icons/md";
import { MdDiscount } from "react-icons/md";

import { MdOutlineCloudUpload } from "react-icons/md";
const CreateListing = () => {
  const [value, setValue] = useState(0);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleImageSubmit = async (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      try {
        const urls = await Promise.all(promises); // Await here
        setFormData((prev) => ({
          ...prev,
          imageUrls: prev.imageUrls.concat(urls),
        }));
        setImageUploadError(false);
      } catch (err) {
        setImageUploadError(err);
      } finally {
        setUploading(false);
      }
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          setUploadSuccess(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type == "number" ||
      e.target.type == "text" ||
      e.target.tagName === "SELECT" ||
      e.target.type == "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");

      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price cannot be higher than regular price");

      setLoading(true);
      setError(false);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const CustomSelect = ({ options, label, value, onChange }) => {
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <select
          value={value}
          onChange={onChange}
          className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300 focus:border-indigo-300 py-2 px-3"
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  console.log(formData);

  return (
    <div className="container mx-auto p-6 mt-28">
      <h1 className="text-3xl font-bold mb-6">Create New Listing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Details Card */}
        <div className="border rounded-lg shadow p-4">
          <h2 className="text-xl font-bold">Property Details</h2>
          <p className="text-gray-500 mb-4">
            Enter the details of your property
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                label="Name"
                onChange={handleChange}
                value={formData.name}
                id="name"
                placeholder="Cozy 3-bedroom apartment in downtown"
                className="w-full  rounded px-3 py-2"
              />
            </div>

            <div className="space-y-2">
              <Textarea
                label="Description"
                onChange={handleChange}
                value={formData.description}
                id="description"
                className="w-full border rounded px-3 py-2"
              ></Textarea>
            </div>

            <div className="space-y-2">
              <Input
                label="Address"
                onChange={handleChange}
                value={formData.address}
                id="address"
                placeholder="123 Main St, City, State, ZIP"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sell or Rent
                </label>
                <select
                  label="Type"
                  onChange={handleChange}
                  value={formData.type}
                  id="type"
                  className="block w-full px-4 py-2 pr-8 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option className="rounded-lg border-gray-800" value="sell">
                    Sell
                  </option>
                  <option value="rent">Rent</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                House advantages
              </label>
              {/* Checkpoints for Sell/Rent, Furnished, Parking Spot */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      onChange={handleChange}
                      checked={formData.furnished}
                      type="checkbox"
                      id="furnished"
                      name="furnished"
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor="furnished" className="ml-2 text-gray-700">
                      Furnished
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      onChange={handleChange}
                      checked={formData.parking}
                      type="checkbox"
                      id="parking"
                      name="parking"
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor="parking" className="ml-2 text-gray-700">
                      Parking Spot
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    type="checkbox"
                    id="offer"
                    checked={formData.offer}
                    onChange={handleChange}
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <label htmlFor="parking" className="ml-2 text-gray-700">
                    Offer
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2">
                <div className="w-80">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-medium"
                  >
                    Bedrooms
                  </Typography>
                  <div className="relative w-full">
                    <FaBed className="absolute left-2 top-1/2 -translate-y-1/2" />
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms} // Use formData.bedrooms as the input value
                      onChange={handleChange}
                      className="!border-t-blue-gray-200 pl-10 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-80">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-medium"
                  >
                    Bathrooms
                  </Typography>
                  <div className="relative w-full">
                    <FaBath className="absolute left-2 top-1/2 -translate-y-1/2" />
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms} // Use formData.bedrooms as the input value
                      onChange={handleChange}
                      className="!border-t-blue-gray-200 pl-10 placeholder:text-blue-gray-300 placeholder:opacity-50 focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-medium"
                >
                  Regular Price
                </Typography>
                <div className="relative w-full">
                  <MdPriceChange className="absolute left-2 top-1/2 -translate-y-1/2" />
                  <Input
                    onChange={handleChange}
                    value={formData.regularPrice}
                    id="regularPrice"
                    type="number"
                    placeholder="2500$"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{
                      className: "min-w-0",
                    }}
                    className="!border-t-blue-gray-200 pl-10 placeholder:text-blue-gray-300 placeholder:opacity-50 focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {formData.offer === true && (
                <div className="space-y-2">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-medium"
                  >
                    Discount Price{" "}
                    {formData.type === "rent" && (
                      <span className="text-[10px] text-gray-400 ">
                        $/per month
                      </span>
                    )}
                  </Typography>
                  <div className="relative w-full">
                    <MdDiscount className="absolute left-2 top-1/2 -translate-y-1/2" />
                    <Input
                      onChange={handleChange}
                      value={formData.discountPrice}
                      id="discountPrice"
                      type="number"
                      placeholder="24$"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      className="!border-t-blue-gray-200 pl-10 placeholder:text-blue-gray-300 placeholder:opacity-50 focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Images Card */}
        <div className="border rounded-lg shadow p-4">
          <h2 className="text-xl font-bold">Images</h2>
          <p className="text-gray-500 mb-4">
            Upload images of your property (max 6)
          </p>

          {/* Image preview grid */}
          <div className="grid grid-cols-2 gap-4">
            {formData.imageUrls.map((image, index) => (
              <div
                key={index}
                className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
              >
                {image ? (
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ) : (
                  <div className="h-32 flex items-center justify-center text-gray-500">
                    Image {index + 1}
                  </div>
                )}
                {/* Delete button */}
                <div
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 "
                >
                  <MdImageNotSupported className="w-6 h-6 text-red-500 hover:text-red-900  " />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center gap-4 mt-4">
            {/* File input for image upload */}
            <label className="relative cursor-pointer rounded-lg bg-white border-2 border-gray-300 p-2 flex items-center justify-center transition hover:border-blue-500">
              <span className="text-gray-600">Select Images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>

            <div>
              {files.length > 0 && <p>{files.length} image(s) selected</p>}
            </div>

            {/* Upload button */}
            <Button
              variant="gradient"
              onClick={handleImageSubmit}
              className=" flex items-center justify-center gap-3 normal-case font-semibold px-4 py-2  "
            >
              <MdOutlineCloudUpload className="w-5 h-5" />
              <span> {uploading ? "Uploading..." : "Upload Images"}</span>
            </Button>
          </div>

          {/* ERROR Section */}
          <p className="text-red-700">
            {imageUploadError &&
              typeof imageUploadError === "string" &&
              imageUploadError}
          </p>

          {/* SUCCESS Section */}
          <p className="text-green-700">{uploadSuccess && uploadSuccess}</p>

          {/* Button to create the listing */}
          <div className="mt-6">
            <Button fullWidth onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating Listing..." : "Create Listing"}
            </Button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
