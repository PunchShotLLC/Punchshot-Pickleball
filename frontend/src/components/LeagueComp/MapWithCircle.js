import {
  GoogleMap,
  Marker,
  useLoadScript,
  Circle,
} from "@react-google-maps/api";
import { useMemo } from "react";
// import dotenv from "dotenv";
// dotenv.config()

const GOOGLE_MAPS_API_KEY = "AIzaSyASByHOyayF2D5qfd8Y2muEA6dfRkeK84c";

const MapWithCircle = ({ center, radius }) => {
  // Load in the API key
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const mapContainerStyle = {
    width: "600px",
    height: "300px",
  };

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
        >
          <Circle
            center={center}
            radius={radius}
            options={{
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default MapWithCircle;
