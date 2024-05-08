import React, { useEffect, useState, useCallback } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import Combobox from 'react-widgets/Combobox';

import 'react-widgets/styles.css';

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export const AutocompleteCustomHybrid: React.FC<Props> = ({ onPlaceSelect }) => {
  const map = useMap();
  const places = useMapsLibrary('places');

  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);

  const [predictionResults, setPredictionResults] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [fetchingData, setFetchingData] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken | null>(null);

  useEffect(() => {
    if (!places || !map) return;

    const autocomplete = new places.AutocompleteService();
    const placesService = new places.PlacesService(map);
    const sessionToken = new places.AutocompleteSessionToken();

    setAutocompleteService(autocomplete);
    setPlacesService(placesService);
    setSessionToken(sessionToken);

    return () => {
      setAutocompleteService(null);
      setPlacesService(null);
      setSessionToken(null);
    };
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue: string, token: google.maps.places.AutocompleteSessionToken) => {
      if (!autocompleteService || !inputValue) {
        return;
      }

      setFetchingData(true);

      const request = { input: inputValue, sessionToken: token };
      const response = await autocompleteService.getPlacePredictions(request);

      if (response) {
        setPredictionResults(response);
      }

      setFetchingData(false);
    },
    [autocompleteService]
  );

  const onInputChange = useCallback(
    (value: google.maps.places.AutocompletePrediction | string) => {
      if (typeof value === 'string' && sessionToken) {
        setInputValue(value);
        fetchPredictions(value, sessionToken);
      }
    },
    [fetchPredictions, sessionToken]
  );

  const onSelect = useCallback(
    (prediction: google.maps.places.AutocompletePrediction | string) => {
      if (!places || !sessionToken || typeof prediction === 'string') return;

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
        filter={() => true}
        focusFirstItem={true}
        hideEmptyPopup
        hideCaret
      />
    </div>
  );
};
