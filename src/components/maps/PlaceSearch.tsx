import { useState } from "react";
import { findPlaces } from "../../utils/places";

const PlaceSearch = () => {
  const [results, setResults] = useState<any[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const places = await findPlaces(e.target.value);
    setResults(places);
    console.log("result---------------->",places);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Gurgugram, Haryana, India"
        onChange={handleChange}
        className="max-w-xs bg-slate-100 text-black"
      />
      {results.length > 0 && (
        <ul>
          {results.map((place) => (
            <li key={place.id}>{place.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceSearch;
