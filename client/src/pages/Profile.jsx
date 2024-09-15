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

const Profile = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
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
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // Ensure cookies are sent
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
                defaultValue={currentUser.username || ""}
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
                defaultValue={currentUser.dob || ""}
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
                Email*
              </label>
              <input
                id="email"
                placeholder="Enter email"
                onChange={handleChange}
                defaultValue={currentUser.email || ""}
                className="mt-1 w-full border px-2 py-2 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                placeholder="Enter phone number"
                onChange={handleChange}
                defaultValue={currentUser.phone || ""}
                className="mt-1 w-full border px-2 py-2 rounded"
              />
            </div>
          </div>
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
          <button
            onClick={handleDeleteUser}
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? (
              <ReactLoading type="spin" color="#fff" height={24} width={24} />
            ) : (
              "Delete Account"
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
    </div>
  );
};

export default Profile;
