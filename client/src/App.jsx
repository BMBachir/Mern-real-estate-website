import { lazy, Suspense, startTransition } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Profile = lazy(() => import("./pages/Profile"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SingUp = lazy(() => import("./pages/SingUp"));
const Properties = lazy(() => import("./pages/Properties"));
const CreateListing = lazy(() => import("./pages/CreateListing"));
const UserListings = lazy(() => import("./pages/UserListings"));
const UpdateListing = lazy(() => import("./pages/UpdateListing"));
const Listing = lazy(() => import("./pages/Listing"));

const App = () => {
  return (
    <BrowserRouter className="app">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/user-listings" element={<UserListings />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />
          </Route>

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SingUp />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
