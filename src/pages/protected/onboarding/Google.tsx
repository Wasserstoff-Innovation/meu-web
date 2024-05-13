import { useState } from 'react';
import { APIProvider} from '@vis.gl/react-google-maps';
import { CustomMapControl } from './CustomMapControl';
import { GOOGLE_MAPS_API } from "../../../config";

export type AutocompleteMode = { id: string; label: string };

const autocompleteModes: Array<AutocompleteMode> = [
    { id: 'classic', label: 'Google Autocomplete Widget' },
    { id: 'custom', label: 'Custom Build' },
    { id: 'custom-hybrid', label: 'Custom w/ Select Widget' }
];

interface MyProps {
    addLocation: (address: string, latitude: number, longitude: number) => void;
}

const Google = ({ addLocation }: MyProps) => {
    const [selectedAutocompleteMode, setSelectedAutocompleteMode] =
        useState<AutocompleteMode>(autocompleteModes[0]);

    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);

    return (
        <APIProvider apiKey={GOOGLE_MAPS_API}>
            <CustomMapControl
                selectedAutocompleteMode={selectedAutocompleteMode}
                onPlaceSelect={setSelectedPlace}
                addLocation={addLocation}
                setSelectedAutocompleteMode = {setSelectedAutocompleteMode}
                selectedPlace = {selectedPlace}
            />
        </APIProvider>
    );
};

export default Google;
