import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "../redux/user/userSlice.js";
import SignButton from "../components/SignButton";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUpStart());
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signUpFailure(data.message));
        return;
      }
      dispatch(signUpSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signUpFailure(error.message));
    }
  };

  return (
    <div className="flex justify-center items-center my-24 mt-[150px] mb-[200px]">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900">
            Sign up to our platform
          </h5>

          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="example"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@company.com"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={handleChange}
            />
          </div>
          <SignButton
            type="submit"
            disabled={loading}
            className="w-full"
          ></SignButton>
          <OAuth />
          <div className="text-sm font-medium text-gray-500">
            Have an account?{" "}
            <Link to="/sign-in" className="text-blue-700 hover:underline">
              Sign In
            </Link>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
