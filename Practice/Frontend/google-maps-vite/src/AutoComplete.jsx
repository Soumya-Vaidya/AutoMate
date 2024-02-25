import { useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

const center = {
  lat: 38.685,
  lng: -115.234,
};

function MyMapWithAutocomplete() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const autocompleteRef = useRef(null);

  const onLoad = (autocomplete) => {
    // console.log('autocomplete: ', autocomplete);
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      // console.log(autocompleteRef.current.getPlace());
    } else {
      // console.log('Autocomplete is not loaded yet!');
    }
  };

  const libraries = ["places"];

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <GoogleMap
        id="searchbox-example"
        mapContainerStyle={mapContainerStyle}
        zoom={2.5}
        center={center}
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Customize your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipsis`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
          />
        </Autocomplete>
      </GoogleMap>
    </LoadScript>
  );
}

export default MyMapWithAutocomplete;
