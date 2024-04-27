import { useGeolocation } from "@shubhamssingh/u-hook";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

const MapView = () => {
  const { loading, error, data } = useGeolocation();
  if (loading) return <p>Loading...</p>;
  if (data.latitude && data.longitude) {
    const position = { lat: data.latitude, lng: data.longitude };
    return (
      <div className="flex-1 flex">
        <Map
          mapId={"bf51a910020fa25a"}
          defaultCenter={position}
          gestureHandling={'greedy'}
          defaultZoom={11}
          className="flex-1  "
        >
          <AdvancedMarker
            position={position}
            title={"AdvancedMarker with customized pin."}
          >
            <Pin
              background={"#22ccff"}
              borderColor={"#1e89a1"}
              glyphColor={"#0f677a"}
            ></Pin>
          </AdvancedMarker>
        </Map>
      </div>
    );
  }
  return error && <p>Error : {`${error}`}</p>;
};

export default MapView;
