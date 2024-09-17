import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const CreateListing = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({ imageUrls: [] });

  const handleImageUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files); // Convert FileList to an array
    const newImages = [...images, ...uploadedFiles]; // Append new files to existing images

    if (newImages.length <= 6) {
      setImages(newImages); // Ensure we don't exceed the maximum of 6 images
    } else {
      alert("You can only upload a maximum of 6 images.");
    }
  };

  const handleImageSubmit = () => {
    if (images.length > 0 && images.length <= 6) {
      // Correcting the typo from Promis to Promise
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
          console.log("Error uploading images:", err);
        });
    } else {
      alert("You can only upload a maximum of 6 images.");
    }
  };

  const storeImage = async (images) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + images.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, images);

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
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
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
                  Property Type
                </label>
                <select id="type" className="w-full border rounded px-3 py-2">
                  <option value="">Select type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                </select>
              </div>
            </div>

            {/* Checkpoints for Sell/Rent, Furnished, Parking Spot */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="sellRent"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sell or Rent
                </label>
                <select
                  id="sellRent"
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="sell">Sell</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="furnished"
                  className="block text-sm font-medium text-gray-700"
                >
                  Furnished
                </label>
                <select
                  id="furnished"
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="parking"
                className="block text-sm font-medium text-gray-700"
              >
                Parking Spot Available
              </label>
              <select id="parking" className="w-full border rounded px-3 py-2">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
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
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
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
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            {/* File input for image upload */}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mt-4 border rounded px-4 py-2"
            />
            <button
              onClick={handleImageSubmit}
              className=" mt-4 bg-blue-500 text-white rounded px-4 py-2"
            >
              Upload
            </button>
          </div>
          {/* Button to create the listing */}
          <button className="w-full mt-4 bg-blue-500 text-white rounded px-4 py-2">
            Create Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
