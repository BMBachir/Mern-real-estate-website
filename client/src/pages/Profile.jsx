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
} from "../redux/user/userSlice.js";
import ReactLoading from "react-loading";
import Loading from "react-loading";

const profile = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

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

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
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
                src={formData.avatar || currentUser.avatar}
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
        <section>
          <h2 className="text-xl font-bold mb-4">Identity</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username*
              </label>
              <input
                id="username"
                placeholder="Enter username"
                onChange={handleChange}
                defaultValue={currentUser.username}
                className="mt-1 w-full border px-2 py-2 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth*
              </label>
              <input
                id="dob"
                placeholder="Enter date of birth"
                onChange={handleChange}
                defaultValue={currentUser.dob}
                className="mt-1 w-full border px-2 py-2 rounded"
              />
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                placeholder="Enter your email address"
                defaultValue={currentUser.email}
                className="mt-1 w-full border px-2 py-2 rounded"
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Password Section */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Password</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                className="mt-1 w-full border px-2 py-2 rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="mt-1 w-full border px-2 py-2 rounded"
                onChange={handleChange}
              />
            </div>
          </div>
        </section>
        {/* Error Handling  */}
        <div>
          <p className="text-red-700 mt-5">{error ? error : ""} </p>
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="btn bg-blue-500 text-white px-4 py-2 rounded flex gap-2 items-center justify-center hover:bg-blue-600"
            aria-label="Save"
            disabled={loading}
          >
            {loading ? (
              <ReactLoading height={24} width={24} />
            ) : (
              <span className="flex items-center gap-2">
                Save <MdSave />
              </span>
            )}
          </button>
        </div>
        <div>
          <p className="text-green-700 mt-5">
            {updateSuccess ? "Profile updated successfully" : ""}{" "}
          </p>
        </div>

        {/* Delete Account Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Delete Account</h2>
          <p className="mb-6 text-red-600">
            <span className="">Warning: </span> Deleting your account is
            irreversible and will remove all your data.
          </p>
          <button className="btn bg-red-500 text-white px-4 py-2 rounded flex gap-2 hover:bg-red-600">
            <span>Delete Account</span>
            <MdDelete />
          </button>
        </div>
      </form>
    </div>
  );
};

export default profile;
