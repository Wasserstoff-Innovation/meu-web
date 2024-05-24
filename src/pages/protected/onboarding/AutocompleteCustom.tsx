import {useEffect, useState, useCallback, FormEvent} from 'react';
import {APIProvider, useMap, useMapsLibrary} from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API } from "../../../config";

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  addLocation: (address: string, latitude: number, longitude: number) => void;
}

// This is a custom built autocomplete component using the "Autocomplete Service" for predictions
// and the "Places Service" for place details
export const AutocompleteCustom = ({onPlaceSelect, addLocation}: Props) => {
  const map = useMap();
  const places = useMapsLibrary('places');

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  // https://developers.google.com/maps/documentation/javascript/reference/places-service
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (!places) return;
    
    setAutocompleteService(new places.AutocompleteService());
  
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }
      const request = {input: inputValue, sessionToken};
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
    [onPlaceSelect, places, placesService, sessionToken, addLocation]
  );

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API}>
    <div className="autocomplete-container">
      <input
        value={inputValue}
        onInput={(event: FormEvent<HTMLInputElement>) => onInputChange(event)}
        placeholder="Search for a place"
        className='text-slate-800 px-2'
      />

      {predictionResults.length > 0 && (
        <ul className="custom-list bg-white text-slate-800 p-2">
          {predictionResults.map(({place_id, description}) => {
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
    </APIProvider>
  );
};
