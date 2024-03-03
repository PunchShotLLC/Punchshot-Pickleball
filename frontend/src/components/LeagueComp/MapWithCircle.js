import {
  GoogleMap,
  Marker,
  useLoadScript,
  Circle,
} from "@react-google-maps/api";
import { useMemo } from "react";

// TODO: ENTER API KEY
const GOOGLE_MAPS_API_KEY = "";

const MapWithCircle = ({ center, radius }) => {
  // Load in the API key
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  if (radius === 0) radius = 0.000001;

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
          <Marker position={center} />
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
