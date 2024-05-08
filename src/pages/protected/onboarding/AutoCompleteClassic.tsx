import React, { useRef, useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  addLocation: (address: string, latitude: number, longitude: number) => void;
}

export const PlaceAutocompleteClassic: React.FC<Props> = ({ onPlaceSelect, addLocation }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address']
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      const place = placeAutocomplete.getPlace();
      onPlaceSelect(placeAutocomplete.getPlace());

      const lat = place.geometry?.location?.lat();
      const lan = place.geometry?.location?.lng();

      addLocation(place.name ?? '', lat ?? 0, lan ?? 0);
    });
  }, [onPlaceSelect, placeAutocomplete, addLocation]);

  return (
    <div className="autocomplete-container">
      <input ref={inputRef} placeholder='Enter a Location...' className='txt-black w-full h-10 px-3 rounded-lg'/>
    </div>
  );
};
