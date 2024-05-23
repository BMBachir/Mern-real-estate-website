import React from "react";
import { BsGoogle } from "react-icons/bs";
const OAuth = () => {
  return (
    <button
      className="flex items-center justify-center gap-2 w-full rounded-md bg-[#4285F4] px-4 py-2 text-white transition-colors hover:bg-[#3367D6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2"
      variant="primary"
    >
      <BsGoogle />
      Continue with Google
    </button>
  );
};

export default OAuth;
