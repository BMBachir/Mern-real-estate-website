import React, { Profiler } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SingUp from "./pages/SingUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Properties from "./pages/Properties";
import Contact from "./pages/Contact";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UserListings from "./pages/UserListings.jsx";
import Listing from "./pages/Listing.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/user-listings" element={<UserListings />} />
        </Route>

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sing-up" element={<SingUp />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
