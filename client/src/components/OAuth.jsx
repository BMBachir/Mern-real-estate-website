import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Result:", result);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not countinue with google!");
    }
  };

  return (
    <Button
      size="lg"
      variant="outlined"
      color="blue-gray"
      className="flex items-center justify-center gap-3 w-full"
      onClick={handleGoogleClick}
    >
      <FcGoogle className="h-6 w-6" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
