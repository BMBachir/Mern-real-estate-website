import React from "react";
import { BsGoogle } from "react-icons/bs";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
const OAuth = () => {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.log("Could not countinue with google!");
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      className="flex items-center justify-center gap-2 w-full rounded-md bg-[#4285F4] px-4 py-2 text-white transition-colors hover:bg-[#3367D6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2"
      variant="primary"
    >
      <BsGoogle />
      Continue with Google
    </button>
  );
};

export default OAuth;
