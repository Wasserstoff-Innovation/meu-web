import { useGeolocation } from "@shubhamssingh/u-hook";
import TopBarProgress from "react-topbar-progress-indicator";
import { Map, AdvancedMarker, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { loaderConfig } from "../../../config";

TopBarProgress.config(loaderConfig);
const MapView = () => {
  const { loading, error, data } = useGeolocation();
  const apiIsLoaded = useApiIsLoaded();
  if (loading || !apiIsLoaded) return <TopBarProgress />;
  if (error)
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        {error.message}
        <p className="text-sm text-gray-500">
          Please allow location access to view the map.
        </p>
        {/* <Button
          className="mt-4"
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              () => {
                console.log("Location requested again.");
              },
              (e) => {
                console.log("Location requested again.", e);
              }
            );
          }}
        >
          Request Location Again
        </Button> */}
      </div>
    );
  if (data.latitude && data.longitude) {
    const position = { lat: data.latitude, lng: data.longitude };
    return (
      <div className="flex-1 flex">
        <Map
          mapId={"bf51a910020fa25a"}
          defaultCenter={position}
          gestureHandling={"greedy"}
          defaultZoom={14}
          className="flex-1"
        >
          <AdvancedMarker
            position={position}
            title={"AdvancedMarker with customized pin."}
          >
            <div
              className="bg-primary-500 text-white p-2 rounded-lg"
              style={{
                width: 20,
                height: 20,
                position: "absolute",
                top: 0,
                left: 0,
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </AdvancedMarker>
        </Map>
      </div>
    );
  }
};

export default MapView;
