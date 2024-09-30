import { useDispatch, useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { MdSave, MdDelete } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice.js";
import ReactLoading from "react-loading";
import { Bell, Key, Lock, Mail, User } from "lucide-react";
import {
  Button,
  Input,
  Checkbox,
  Radio,
  Select,
  Option,
  Switch,
  Tab,
  Tabs,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const Profile = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      console.error("File is too large");
      setFileUploadError("File exceeds the size limit of 10MB");
      return;
    }

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error("File upload error:", error);
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, avatar: downloadURL }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("The User : ", currentUser);
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `
/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include", // Ensure cookies are sent
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are sent with the request
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <div className="container mx-auto md:max-w-5xl py-8 px-4 sm:px-6 lg:px-8 flex flex-col">
      <form onSubmit={handleSubmit} className="mb-8">
        {/* Personal Information Section */}
        <section id="property-info" className="mb-8">
          <h1 className="text-2xl font-bold">Personal Information</h1>
          <img
            src="https://picsum.photos/200/300/?blur=2"
            alt=""
            className="w-full h-48 mt-4 bg-gray-200"
          />
          <div className="relative flex justify-center mt-[-50px]">
            <div className="w-32 h-32 border-4 border-white rounded-full bg-gray-300 flex items-center justify-center relative">
              <img
                src={
                  formData.avatar || currentUser.avatar || "default-avatar.png"
                }
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                accept="image/*"
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="absolute bottom-2 right-2 text-white bg-black p-2 rounded-full w-8 h-8 cursor-pointer opacity-75 hover:opacity-100"
              >
                <FaCamera />
              </label>
            </div>
          </div>
          <p className="text-sm flex items-center justify-center">
            {fileUploadError ? (
              <span className="text-red-400">
                Error Image Upload:{" "}
                {fileUploadError.message || "Image must be less than 2MB"}
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p>
        </section>

        {/* Identity Section */}
        <section className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username*
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                onChange={handleChange}
                defaultValue={currentUser.username || ""}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date of Birth*
              </label>
              <input
                id="dob"
                type="date"
                onChange={handleChange}
                defaultValue={currentUser.dob || ""}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-blue-500 transition duration-200"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">* Required fields</p>
        </section>

        {/* Contact Information Section */}
        <section className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                defaultValue={currentUser.email || ""}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                onChange={handleChange}
                defaultValue={currentUser.phone || ""}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-blue-500 transition duration-200"
              />
            </div>
          </div>
          {/* Password Update Section */}
          <div className="bg-white p-6 rounded-lg border mt-5 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Update Password
            </h3>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password*
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter New Password"
              onChange={handleChange}
              className="mt-1 w-full border px-4 py-3 rounded-md  focus:outline-none shadow-sm  transition duration-150 ease-in-out"
            />
            <p className="text-sm text-gray-500 mt-2">
              Make sure your password is strong and easy to remember.
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-4">* Required fields</p>
        </section>
        {/* Submit Button */}
        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? (
              <ReactLoading type="spin" color="#fff" height={24} width={24} />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>

      {/* Display success message */}
      {updateSuccess && (
        <div className="p-4 bg-green-100 text-green-700 border border-green-300 rounded">
          Profile updated successfully!
        </div>
      )}

      {/* Display error message */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded">
          Error: {error.message}
        </div>
      )}

      <section className="mt-8">
        <div className="grid grid-cols-1 gap-6">
          {/* Account Deletion Section */}

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Advanced
            </h2>
            <h3 className="text-md font-semibold text-red-600 mb-2">
              Delete Account
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure? Once you delete your account, all of your data will
              be permanently lost.
            </p>
            <button
              onClick={() => setDeleteModalOpen(true)} // Opens confirmation modal
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition duration-200 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <ReactLoading type="spin" color="#fff" height={24} width={24} />
              ) : (
                "Delete Account"
              )}
            </button>
          </div>
        </div>

        {/* Modal for account deletion confirmation */}
        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirm Account Deletion
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete your account? This action is
                irreversible, and all your data will be permanently removed.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={handleDeleteUser}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200 ease-in-out"
                >
                  {loading ? (
                    <ReactLoading
                      type="spin"
                      color="#fff"
                      height={24}
                      width={24}
                    />
                  ) : (
                    "Confirm Deletion"
                  )}
                </button>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition duration-200 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
