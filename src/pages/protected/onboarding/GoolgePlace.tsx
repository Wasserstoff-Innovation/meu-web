import React, {useRef, useEffect, useState, useCallback, FormEvent} from 'react';
import {createRoot} from 'react-dom/client';
import {APIProvider, ControlPosition, useMap, MapControl, useMapsLibrary} from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API } from "../../../config";
import Combobox from 'react-widgets/Combobox';
import 'react-widgets/styles.css';

export type AutocompleteMode = {id: string; label: string};

const autocompleteModes: Array<AutocompleteMode> = [
  {id: 'classic', label: 'Google Autocomplete Widget'},
  {id: 'custom', label: 'Custom Build'},
  {id: 'custom-hybrid', label: 'Custom w/ Select Widget'}
];

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

//mapCustome component
type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition;
  selectedAutocompleteMode: AutocompleteMode;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};


//autocompkete classicinterface Props 
interface Props
{
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

//autoCOmplete CUstom
interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

//autoComplete Custoem Hybrid
interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}


const GooglePlace = ({onPlaceSelect}: Props) => {

  const [selectedAutocompleteMode, setSelectedAutocompleteMode] =
  useState<AutocompleteMode>(autocompleteModes[0]);

const [selectedPlace, setSelectedPlace] =
  useState<google.maps.places.PlaceResult | null>(null);

  return(
    <APIProvider apiKey={GOOGLE_MAPS_API}>
      <CustomMapControl
        controlPosition={ControlPosition.TOP}
        selectedAutocompleteMode={selectedAutocompleteMode}
        onPlaceSelect={setSelectedPlace}
      />
    </APIProvider>
  )

}
export default GooglePlace;


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




export const PlaceAutocompleteClassic: React.FC<Props> = ({ onPlaceSelect }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places'); // Assuming you have defined useMapsLibrary hook

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options: google.maps.places.AutocompleteOptions = {
      fields: ['geometry', 'name', 'formatted_address']
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });

    return () => {
      placeAutocomplete.unbindAll(); // Cleanup to remove event listeners when component unmounts
    };
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input ref={inputRef} />
    </div>
  );
};


export const AutocompleteCustom: React.FC<Props> = ({ onPlaceSelect }) => {
  const map = useMap();
  const places = useMapsLibrary('places');

  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken>();

  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);

  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);

  const [predictionResults, setPredictionResults] = useState<Array<google.maps.places.AutocompletePrediction>>([]);

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement)?.value;

      setInputValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions]
  );

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ['geometry', 'name', 'formatted_address'],
        sessionToken
      };

      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null
      ) => {
        onPlaceSelect(placeDetails);
        setPredictionResults([]);
        setInputValue(placeDetails?.formatted_address ?? '');
        setSessionToken(new places.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken]
  );

  return (
    <div className="autocomplete-container">
      <input
        value={inputValue}
        onInput={(event: FormEvent<HTMLInputElement>) => onInputChange(event)}
        placeholder="Search for a place"
      />

      {predictionResults.length > 0 && (
        <ul className="custom-list">
          {predictionResults.map(({ place_id, description }) => {
            return (
              <li
                key={place_id}
                className="custom-list-item"
                onClick={() => handleSuggestionClick(place_id)}>
                {description}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export const AutocompleteCustomHybrid: React.FC<Props> = ({ onPlaceSelect }) => {
  const map = useMap();
  const places = useMapsLibrary('places');

  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken>();

  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);

  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);

  const [predictionResults, setPredictionResults] = useState<Array<google.maps.places.AutocompletePrediction>>([]);

  const [inputValue, setInputValue] = useState<string>('');

  const [fetchingData, setFetchingData] = useState<boolean>(false);

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        return;
      }

      setFetchingData(true);

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
      setFetchingData(false);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (value: google.maps.places.AutocompletePrediction | string) => {
      if (typeof value === 'string') {
        setInputValue(value);
        fetchPredictions(value);
      }
    },
    [fetchPredictions]
  );

  const onSelect = useCallback(
    (prediction: google.maps.places.AutocompletePrediction | string) => {
      if (!places || typeof prediction === 'string') return;

      setFetchingData(true);

      const detailRequestOptions = {
        placeId: prediction.place_id,
        fields: ['geometry', 'name', 'formatted_address'],
        sessionToken
      };

      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null
      ) => {
        onPlaceSelect(placeDetails);
        setInputValue(placeDetails?.formatted_address ?? '');
        setSessionToken(new places.AutocompleteSessionToken());

        setFetchingData(false);
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken]
  );

  return (
    <div className="autocomplete-container">
      <Combobox
        placeholder="Search for a place"
        data={predictionResults}
        dataKey="place_id"
        textField="description"
        value={inputValue}
        onChange={onInputChange}
        onSelect={onSelect}
        busy={fetchingData}
        // Since the Autocomplete Service API already returns filtered results
        // always want to display them all.
        filter={() => true}
        focusFirstItem={true}
        hideEmptyPopup
        hideCaret
      />
    </div>
  );
};