import { useEffect, useState } from "react";
import Landing from "./Landing";
import Navbar from "./components/NavBar";
import Dashboard from "./components/Dashboard";

function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [userLocation, setUserLocation] = useState(null);
  const [user, setUser] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    // Check for geolocation permission when the component mounts
    checkLocationPermission();

    // Add an event listener to update the permission status when it changes
    const permissionChangeListener = () => {
      checkLocationPermission();
    };

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      result.onchange = permissionChangeListener;
    });

    return () => {
      // Cleanup by removing the event listener
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        result.onchange = null;
      });
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      if (locationPermission == "denied") {
        alert("why u deny");
      }
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });
      });
    }
  }, [locationPermission]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const checkLocationPermission = async () => {
    try {
      const { state } = await navigator.permissions.query({
        name: "geolocation",
      });

      if (state === "granted") {
        setLocationPermission("granted");
      } else if (state === "prompt") {
        setLocationPermission("prompt");
      } else {
        setLocationPermission("denied");
      }
    } catch (error) {
      console.error("Error checking location permission:", error);
    }
  };

  return (
    <>
      <Navbar setUser={setUser} user={user} />
      {user ? <Dashboard /> : <Landing />}
    </>
  );
}

export default App;
