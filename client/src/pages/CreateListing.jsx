import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { MdImageNotSupported } from "react-icons/md";

const CreateListing = () => {
  const [images, setImages] = useState([]);
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
  const [imagesUploadError, setImagesUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files); // Convert FileList to an array
    const newImages = [...images, ...uploadedFiles]; // Append new files to existing images

    if (newImages.length <= 6) {
      setImages(newImages); // Ensure we don't exceed the maximum of 6 images
    } else {
      setImagesUploadError("You can only upload a maximum of 6 images.");
      setUploading(false);
    }
  };

  const handleImageDelete = (indexToDelete) => {
    setImages(images.filter((_, index) => index !== indexToDelete));
  };

  const handleImageSubmit = () => {
    if (images.length > 0 && images.length <= 6) {
      setUploading(true);
      setImagesUploadError(false);
      const promises = images.map((image) => storeImage(image));

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls), // Save image URLs in state
          });
          console.log("Images uploaded successfully:", urls);
        })
        .catch((err) => {
          setImagesUploadError("Image upload failed.(2mb max per image)");
          setUploading(false);
        });
      setImagesUploadError(false);
      setUploading(false);
    } else {
      setImagesUploadError("You can only upload a maximum of 6 images.)");
      setUploading(false);
    }
  };

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Uploaded successfully...");
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

  const handleChange = async (e) => {
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type == "number" ||
      e.target.type == "text" ||
      e.target.tagName === "TEXTAREA" ||
      e.target.tagName == "SELECT"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
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
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                onChange={handleChange}
                value={formData.name}
                id="name"
                placeholder="Cozy 3-bedroom apartment in downtown"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                onChange={handleChange}
                value={formData.description}
                id="description"
                placeholder="Describe your property..."
                className="w-full border rounded px-3 py-2"
              ></textarea>
            </div>

            {/* Pricing Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="regularPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Regular Price
                </label>
                <input
                  onChange={handleChange}
                  value={formData.regularPrice}
                  id="regularPrice"
                  type="number"
                  placeholder="2500$"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="discountPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount Price{" "}
                  <span className="text-[10px] text-gray-400 ">/month</span>
                </label>
                <input
                  onChange={handleChange}
                  value={formData.discountPrice}
                  id="discountPrice"
                  type="number"
                  placeholder="24$"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
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
                  onChange={handleChange}
                  value={formData.type}
                  id="type"
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="sell">Sell</option>
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
                    <input
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
                    <input
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
                  <input
                    onChange={handleChange}
                    checked={formData.offer}
                    type="checkbox"
                    id="offer"
                    name="parking"
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <label htmlFor="parking" className="ml-2 text-gray-700">
                    Offer
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="bedrooms"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bedrooms
                </label>
                <input
                  onChange={handleChange}
                  value={formData.bedrooms}
                  id="bedrooms"
                  type="number"
                  placeholder="3"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bathrooms
                </label>
                <input
                  onChange={handleChange}
                  value={formData.bathrooms}
                  id="bathrooms"
                  type="number"
                  placeholder="2"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                onChange={handleChange}
                value={formData.address}
                id="address"
                placeholder="123 Main St, City, State, ZIP"
                className="w-full border rounded px-3 py-2"
              />
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
            {images.map((image, index) => (
              <div
                key={index}
                className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
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
                  onClick={() => handleImageDelete(index)}
                  className="absolute top-2 right-2 "
                >
                  <MdImageNotSupported className="w-6 h-6 hover:text-red-500  " />
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
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>

            {/* Upload button */}
            <button
              onClick={handleImageSubmit}
              className="bg-blue-500 text-white font-semibold rounded-lg px-6 py-2 transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
            >
              Upload
            </button>
          </div>
          {/* ERROR Section */}
          <p className="text-red-700">
            {imagesUploadError && imagesUploadError}
          </p>
          {/* Button to create the listing */}
          <button className="w-full mt-4 bg-blue-500 text-white font-semibold rounded-lg px-6 py-2 transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
            Create Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
