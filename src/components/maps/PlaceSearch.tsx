import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useState } from "react";
import { findPlaces } from "../../utils/places";

const PlaceSearch = () => {
  const [results, setResults] = useState<any[]>([]);

  return (
    <Autocomplete
      name="location"
      type="text"
      placeholder="Gurgugram, Haryana, India"
      isClearable
      variant="bordered"
      onChange={async (e) => {
        const places = await findPlaces(e.target.value);
        setResults(places);
      }}
      items={results.map((place) => ({ id: place.id, displayName: place.name }))}
      className="max-w-xs bg-slate-100 text-black"
      onSelectionChange={(selectedItem) => {
        if (selectedItem) {
          console.log(selectedItem); 
        }
      }}
    >
      {(item) => (
        <AutocompleteItem key={item.id}>{item.displayName}</AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default PlaceSearch;
