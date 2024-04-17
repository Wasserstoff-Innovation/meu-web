const apiKey = "AIzaSyCtpFo2UiK9m9aklXh8-uGRUhEwfuv_YQw";
import React, { useEffect, useRef} from "react";

const mapApiJs = "https://maps.googleapis.com/maps/api/js";

interface Address {
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  plain(): string;
}

interface LocationSearchProps {
  onLocationChange: (location: Address) => void;
}

function loadAsyncScript(src: string): Promise<HTMLScriptElement> {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const extractAddress = (
  place: google.maps.places.PlaceResult | undefined
): Address => {
  const address: Address = {
    city: "",
    state: "",
    country: "",
    latitude: 0,
    longitude: 0,
    plain() {
      const city = this.city ? this.city + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + state + this.country;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }
  });

  if (place && place.geometry && place.geometry.location) {
    address.latitude = place.geometry.location.lat();
   // console.log("=============>lat",address.latitude)
    address.longitude = place.geometry.location.lng();
    //console.log("=============>long",address.longitude)
  }

  return address;
};

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationChange }) => {
  const searchInput = useRef<HTMLInputElement>(null);

  const initMapScript = () => {
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  const onChangeAddress = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    const address = extractAddress(place);
    onLocationChange(address);
  };

  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);

  return (
    <div className="">
      <input
        ref={searchInput}
        type="text"
        placeholder="Search location..."
        className="w-full p-2 rounded-lg text-black  bg-slate-50 hover:bg-[#e5e7eb]"
      />
    </div>
  );
};

export default LocationSearch;
