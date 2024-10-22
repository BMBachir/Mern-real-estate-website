import React, { useState, lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "../redux/user/userSlice.js";
import img1 from "../images/1.png";
import img2 from "../images/2.png";
import img3 from "../images/3.png";
import img4 from "../images/4.png";
import { Input } from "@material-tailwind/react";
import { Mail, LockKeyhole, CircleUserRound } from "lucide-react";

const SignButton = lazy(() => import("../components/SignButton"));
const OAuth = lazy(() => import("../components/OAuth"));

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
    <div className="min-h-screen  bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mt-28 md:mt-0 bg-card text-card-foreground rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side: Decorative images */}
          <div className="w-full md:w-[1200px] relative h-[400px] md:h-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-secondary/80 mix-blend-multiply"></div>
            <div className="absolute mt-20 md:mt-0 inset-0 flex flex-col items-center justify-center p-8 text-white z-10">
              <h1 className="prompt-signin text-3xl md:text-4xl font-bold mb-4">
                Create Your Account
              </h1>
              <p className="prompt-medium text-base md:text-lg text-center mb-8">
                Join us and unlock the full potential of our platform.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                {[img1, img2, img3, img4].map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`Decorative image ${index + 1}`}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: Sign-in form */}
          <div className="w-[90%] md:w-[500px] lg:w-[1100px] mt-20 md:mt-0 flex justify-center items-center py-8 md:py-16 mx-auto ">
            <div className="w-full max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col items-center justify-center">
                  <h5 className="prompt-signin text-2xl md:text-3xl font-bold text-gray-900">
                    Sign Up
                  </h5>
                  <p className="text-gray-600 text-sm">
                    Join us to get started!
                  </p>
                </div>

                <div className="">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-800"
                  >
                    Username
                  </label>
                  <div className="relative w-full flex items-center justify-center mb-6">
                    <CircleUserRound className="absolute text-gray-800 w-5 h-5 left-3 top-6 -translate-y-1/2" />
                    <Input
                      placeholder="example"
                      required
                      type="text"
                      name="username"
                      id="username"
                      onChange={handleChange}
                      className="!border-gray-400 pl-10 py-6 placeholder:text-gray-400 placeholder:opacity-100 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                  </div>
                </div>

                <div className="">
                  <label
                    htmlFor="email"
                    className="prompt-medium text-sm text-gray-800 mb-2 block"
                  >
                    Email
                  </label>
                  <div className="relative w-full flex items-center justify-center mb-6">
                    <Mail className="absolute text-gray-800 w-5 h-5 left-3 top-6 -translate-y-1/2" />
                    <Input
                      placeholder="name@company.com"
                      required
                      onChange={handleChange}
                      type="email"
                      name="email"
                      id="email"
                      className="!border-gray-400 pl-10 py-6 placeholder:text-gray-400 placeholder:opacity-100 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="prompt-medium text-sm text-gray-800 mb-2 block"
                  >
                    Password
                  </label>
                  <div className="relative w-full flex items-center justify-center">
                    <LockKeyhole className="absolute text-gray-800 w-5 h-5 left-3 top-6 -translate-y-1/2" />
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      required
                      onChange={handleChange}
                      className="!border-gray-400 pl-10 py-6 placeholder:text-gray-400 placeholder:opacity-100 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                  </div>
                </div>

                <SignButton
                  type="submit"
                  disabled={loading}
                  className="w-full"
                ></SignButton>

                {/* Separator with line and text */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-4 bg-white text-gray-500 text-xs uppercase">
                    Or continue with
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <OAuth />

                <div className="text-sm font-medium text-center text-gray-500">
                  You have an account?{" "}
                  <Link to="/sign-in" className="text-blue-700 hover:underline">
                    Sign In
                  </Link>
                </div>

                {error && <p className="text-red-500">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
