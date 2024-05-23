import { PlaceAutocompleteClassic } from './AutoCompleteClassic';
import { AutocompleteCustom } from './AutocompleteCustom';
import { AutocompleteCustomHybrid } from './AutocompleteCustomHybrid';

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
  selectedAutocompleteMode,
  addLocation

}: CustomAutocompleteControlProps) => {
const {id} = selectedAutocompleteMode

  return (
    <>
    <div className="autocomplete-control">
    {
      id === 'classic' && (
     <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} addLocation={addLocation}/>
      )
    }
            {id === 'custom' && (
          <AutocompleteCustom onPlaceSelect={onPlaceSelect} addLocation={addLocation} />
        )}

        {id === 'custom-hybrid' && (
          <AutocompleteCustomHybrid onPlaceSelect={onPlaceSelect} addLocation={addLocation} />
        )}
    </div>
    
    </>
  );
};