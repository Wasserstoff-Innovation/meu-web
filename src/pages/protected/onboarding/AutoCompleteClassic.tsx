import React, {useRef, useEffect, useState} from 'react';
import {useMapsLibrary} from '@vis.gl/react-google-maps';

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  addLocation: (address: string, latitude: number, longitude: number) => void;
}

// This is an example of the classic "Place Autocomplete" widget.
// https://developers.google.com/maps/documentation/javascript/place-autocomplete
export const PlaceAutocompleteClassic = ({onPlaceSelect, addLocation}: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
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
    debugger
      onPlaceSelect(placeAutocomplete.getPlace());
      console.log(place)
    //   const latitude = place.geometry?.location.lat() ?? 0;
    //   const longitude = place.geometry?.location.lng() ?? 0;
    });
  }, [onPlaceSelect, placeAutocomplete]);

  const handleChange = () => {
   
  }

  return (
    <div className="autocomplete-container">
      <input onChange={handleChange} ref={inputRef} placeholder='Enter a Location...' className='txt-black w-full h-10 px-3 rounded-lg'/>
    </div>
  );
};
