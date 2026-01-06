import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (!userToken) {
      navigate("/signin"); // Redirect to sign-in page if token doesn't exist
    } else {
      axios
        .get(import.meta.env.VITE_SERVER_URL + "/api/v1/user/getUser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, []);

  const signOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="h-16 flex justify-between items-center md:px-10 px-4 sticky top-0 z-20 animate-slide-down bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Link to={"/dashboard"}>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold">H</div>
          <div className="font-semibold text-white tracking-wide text-lg">Horizon</div>
        </div>
      </Link>
      <div className="flex items-center justify-center gap-3">
        <div className="hidden sm:block text-sm text-white/90">{user?.firstName}</div>
        <div className="rounded-full h-10 w-10 bg-white/20 text-white flex items-center justify-center font-semibold">
          {user?.firstName?.[0]?.toUpperCase()}
        </div>
        <Button label={"Sign Out"} onClick={signOutHandler} variant="secondary" />
      </div>
    </div>
  );
};
