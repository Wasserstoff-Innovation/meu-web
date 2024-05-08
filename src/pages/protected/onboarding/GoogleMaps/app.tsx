import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { APIProvider, ControlPosition, Map } from '@vis.gl/react-google-maps';
import { CustomMapControl } from './map-control';
import { GOOGLE_MAPS_API } from '../../../../config';

  export type AutocompleteMode = {id: string; label: string};

const autocompleteModes: Array<AutocompleteMode> = [
  { id: 'classic', label: 'Google Autocomplete Widget' },
  { id: 'custom', label: 'Custom Build' },
  { id: 'custom-hybrid', label: 'Custom w/ Select Widget' }
];

const App: React.FC = () => {
  const [selectedAutocompleteMode, setSelectedAutocompleteMode] =
    useState<AutocompleteMode>(autocompleteModes[0]);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API}>
      <CustomMapControl
        controlPosition={ControlPosition.TOP}
        selectedAutocompleteMode={selectedAutocompleteMode}
        onPlaceSelect={setSelectedPlace}
      />
    </APIProvider>
  );
};

export default App;

export function renderToDom(container: HTMLElement) {
  const root = createRoot(container);

  root.render(<App />);
}
