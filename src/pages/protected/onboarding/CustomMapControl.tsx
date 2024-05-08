import React from 'react';
import {ControlPosition, MapControl} from '@vis.gl/react-google-maps';

import {PlaceAutocompleteClassic} from './AutoCompleteClassic'

import type {AutocompleteMode} from './Google'

type CustomAutocompleteControlProps = {
controlPosition: ControlPosition;
  selectedAutocompleteMode: AutocompleteMode;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  addLocation : (address: string, latitude: number, longitude: number) => void
};

export const CustomMapControl = ({
    controlPosition,
  selectedAutocompleteMode,
  onPlaceSelect,
  addLocation

}: CustomAutocompleteControlProps) => {
  const {id} = selectedAutocompleteMode;

  return (
    <>
     <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} addLocation={addLocation}/>
    </>
  );
};
