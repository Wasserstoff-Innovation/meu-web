import React from 'react';
import {ControlPosition, MapControl} from '@vis.gl/react-google-maps';
import type {AutocompleteMode} from './app';
import { PlaceAutocompleteClassic } from './autocomplete-classic';
import { AutocompleteCustom } from './autocomplete-custom';
import { AutocompleteCustomHybrid } from './autocomplete-custom-hybrid';


type CustomAutocompleteControlProps = {
    controlPosition: ControlPosition;
    selectedAutocompleteMode: AutocompleteMode;
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  };
  
  export const CustomMapControl: React.FC<CustomAutocompleteControlProps> = ({
    controlPosition,
    selectedAutocompleteMode,
    onPlaceSelect
  }) => {
    const { id } = selectedAutocompleteMode;
  
    return (
      <MapControl position={controlPosition}>
        <div className="autocomplete-control">
          {id === 'classic' && (
            <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} />
          )}
  
          {id === 'custom' && (
            <AutocompleteCustom onPlaceSelect={onPlaceSelect} />
          )}
  
          {id === 'custom-hybrid' && (
            <AutocompleteCustomHybrid onPlaceSelect={onPlaceSelect} />
          )}
        </div>
      </MapControl>
    );
  };