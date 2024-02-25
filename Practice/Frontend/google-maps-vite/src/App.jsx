import { useEffect, useState } from 'react'

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";


const containerStyle = {
  width: "400px",
  height: "400px",
};

function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const [userLocation, setUserLocation] = useState(null);

  const mapOptions = {
    zoom: 15,
  };

  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    // Check for geolocation permission when the component mounts
    checkLocationPermission();

    // Add an event listener to update the permission status when it changes
    const permissionChangeListener = () => {
      checkLocationPermission();
    };

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      result.onchange = permissionChangeListener;
    });

    return () => {
      // Cleanup by removing the event listener
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        result.onchange = null;
      });
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      if (locationPermission == 'denied') {
        alert('why u deny');
      }
      // console.log('prompt shown');
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log('prompt accepted');
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });

      });

    }
  }, [locationPermission]);

  const checkLocationPermission = async () => {
    try {
      const { state } = await navigator.permissions.query({ name: 'geolocation' });

      if (state === 'granted') {
        setLocationPermission('granted');
      } else if (state === 'prompt') {
        setLocationPermission('prompt');
      } else {
        setLocationPermission('denied');
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={userLocation} zoom={mapOptions.zoom} >
          {userLocation && <Marker position={userLocation} />}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default App
