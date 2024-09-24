import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("A message from client");

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        if (data.success === false) {
          throw new Error(data.message);
        }
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex justify-center items-center rounded-lg bg-gray-100">
      {landlord && (
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
          <div className="grid grid-cols-1 gap-4 justify-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800  flex items-center gap-2 ">
              Contact{" "}
              <span className="bg-gray-100 p-2 rounded-lg flex  text-md">
                {landlord.username}
              </span>
            </h2>
          </div>

          <form className="space-y-4">
            {/* Message Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={onChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Message"
                rows="6"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Link
                to={`mailto:${landlord.email}?subject=${subject}&body=${message}`}
              >
                <Button className="w-full transition-transform transform hover:scale-105 duration-300 ease-in-out">
                  {" "}
                  Send Message
                </Button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Contact;
