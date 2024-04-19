import React, { useRef, useEffect } from 'react';

interface Address {
  locationDetails:string;
  latitude: number;
  longitude: number;
}

interface LocationSearchProps {
  onLocationChange: (location: Address) => void;
}

const PlaceSearch: React.FC<LocationSearchProps> = ({ onLocationChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.google && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        console.log(place)
        if (place.geometry && place.geometry.location && place.formatted_address) {
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();
         
            const address: Address = {
              locationDetails:place.formatted_address,
              latitude,
              longitude,
            }
            console.log('Address:', address);
            // Call the onLocationChange function with the address object
            onLocationChange(address);
         }
      });
    }
  }, [onLocationChange]);

  return (
    <div className='bg-white text-black rounded-lg'>
      <input
        ref={inputRef}
        type="text"
        id="pac-input"
        placeholder="Enter a location"
        className='p-2 rounded-lg w-full'
      />
    </div>
  );
};

export default PlaceSearch;
