import {PlaceAutocompleteClassic} from './AutoCompleteClassic'

import type {AutocompleteMode} from './Google'

type CustomAutocompleteControlProps = {
  selectedAutocompleteMode: AutocompleteMode;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  addLocation : (address: string, latitude: number, longitude: number) => void
  setSelectedAutocompleteMode : any
  selectedPlace : any
};

export const CustomMapControl = ({
  onPlaceSelect,
  addLocation

}: CustomAutocompleteControlProps) => {


  return (
    <>
     <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} addLocation={addLocation}/>
    </>
  );
};
