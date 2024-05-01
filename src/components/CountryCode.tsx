import React, { useState, useEffect } from "react";
import { countryOptions } from "../constants/country";

interface Props {
  countryCode: string;
  onChange: (code: string) => void;
}

const CountryCode: React.FC<Props> = ({ countryCode, onChange }) => {
  const [toggle, setToggle] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const [countryList, setCountryList] = useState(countryOptions);

  const filteredCountries = (value: string) => {
    const tempList = countryOptions.filter((country) =>
      country.label.toLowerCase().includes(value.toLowerCase())
    );
    setCountryList(tempList);
  };

  const handleSearch = (value: string) => {
    setSearchCountry(value);
    const val = value.toLowerCase();
    filteredCountries(val);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest(".country-code-container")) {
        setToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-1/4 rounded-md p-2 bg-slate-50 hover:bg-[#e5e7eb] country-code-container" onClick={() => setToggle(!toggle)}>
      <div>{countryCode}</div>
      {toggle && (
        <div className="bg-white absolute rounded left-0 max-h-[35vh] z-10 overflow-y-auto">
          <input
            type="text"
            className="w-full outline-none max-w-[90%] p-2 sticky top-0"
            value={searchCountry}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search country code"
          />
          {countryList.map((country, index) => (
            <div
              key={index}
              className="cursor-pointer ml-2"
              onClick={() => {
                onChange(country.value);
                setToggle(false);
                setSearchCountry("");
                setCountryList(countryOptions);
              }}
            >
              {country.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryCode;
