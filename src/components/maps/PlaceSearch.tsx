import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useState } from "react";
import { findPlaces } from "../../utils/places";

const PlaceSearch = () => {
  // const [value, setValue] = useState<string | null>(null);

  const [results, setResults] = useState<google.maps.places.Place[]>([]);
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
      items={results}
      className="max-w-xs"
      // selectedKey={value}
      onSelectionChange={(e) => {
        console.log(e);
      }}
    >
      {(item) => (
        <AutocompleteItem key={item.id}>{item.displayName}</AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default PlaceSearch;
