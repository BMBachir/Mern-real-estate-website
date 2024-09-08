import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const profile = () => {
  const fileRef = useRef(null);
  const [file, setfile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  // useEffect to monitor file change and trigger upload
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]); // Added file as dependency to trigger on file change

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; // Generate a unique file name
    const storageRef = ref(storage, fileName); // Create a reference to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file); // Start file upload

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track upload progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress)); // Update progress in state
      },
      (error) => {
        console.error("File upload error:", error); // Log errors
        setFileUploadError(error);
      },
      () => {
        // Get the download URL once the upload is complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, avatar: downloadURL })); // Update form data with the new avatar URL
        });
      }
    );
  };

  return (
    <div className="container mx-auto md:max-w-5xl py-8 px-4 sm:px-6 lg:px-8 flex flex-col ">
      <section id="property-info" className="mb-8">
        <h1 className="text-2xl font-bold">Personal information</h1>
        <img
          src="https://picsum.photos/200/300/?blur=2"
          alt=""
          className="abselout w-full h-48 mt-4 bg-gray-200"
        />

        <div className="relative flex justify-center mt-[-50px]">
          <div className="w-32 h-32 border-4 border-white rounded-full bg-gray-300 flex items-center justify-center relative">
            <img
              src={formData.avatar || currentUser.avatar}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />

            {/* Hidden File Input */}
            <input
              onChange={(e) => setfile(e.target.files[0])}
              type="file"
              accept="image/*"
              className="hidden"
              id="file-input"
            />

            {/* Camera Icon Positioned Absolutely */}
            <label
              htmlFor="file-input"
              className="absolute bottom-2 right-2 text-white bg-black p-2 rounded-full w-8 h-8 cursor-pointer opacity-75 hover:opacity-100"
            >
              <FaCamera />
            </label>
          </div>
        </div>
        <p className="text-sm flex items-center justify-center">
          {" "}
          {fileUploadError ? (
            <span className=" text-red-400">
              Error Image Upload ( the image must be less than 2mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span>{`Uploading ${filePerc} %`}</span>
          ) : filePerc === 100 ? (
            <span className=" text-green-600">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Identity</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="transaction-id"
              className="block text-sm font-medium text-gray-700"
            >
              Username*
            </label>
            <input
              placeholder="Enter transaction ID"
              defaultValue={currentUser.username}
              className="mt-1 w-full border px-2 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Transaction*
            </label>
            <input
              placeholder="Enter transaction date"
              defaultValue={currentUser.date}
              className="mt-1 w-full border px-2 py-2  rounded"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              placeholder="Enter your email address"
              defaultValue={currentUser.email}
              className="mt-1 w-full border px-2 py-2  rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              placeholder="Enter your phone number"
              defaultValue={currentUser.phone}
              className="mt-1 w-full border px-2 py-2  rounded"
            />
          </div>
        </div>
      </section>

      {/* Password Section */}
      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              className="mt-1 w-full border px-2 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="mt-1 w-full border px-2 py-2 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="mt-1 w-full border px-2 py-2 rounded"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button className="btn px-4 py-2 rounded flex gap-2 ">
              <span>Save</span>
              <MdSave />
            </button>
          </div>
        </div>
      </section>

      {/* Delete or Deactivate Account Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Account Settings</h2>
        <p className="mb-6 text-red-600">
          Warning: Deleting your account is irreversible and will remove all
          your data.
        </p>
        <div className="flex justify-between">
          <button className="btn text-white px-4 py-2 rounded hover:bg-red-500">
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default profile;
