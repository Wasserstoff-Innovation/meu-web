// CountryCodeSelector.tsx
import React, { useState } from "react";
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

  return (
    <div className="w-1/4 rounded-md p-2 bg-slate-50 hover:bg-[#e5e7eb]" onClick={(e) => {
      setToggle(true);
      e.stopPropagation();
    }}>
      <div>{countryCode}</div>
      {toggle && (
        <div className="bg-white absolute rounded-sm mt-3 p-1 left-0 max-h-[35vh] z-10 overflow-y-auto">
          <input
            type="text"
            className="w-full outline-none m-1 max-w-[90%]"
            value={searchCountry}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search country code"
          />
          {countryList.map((country, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={(e) => {
                onChange(country.value);
                setToggle(false);
                setSearchCountry("");
                setCountryList(countryOptions);
                e.stopPropagation();
              }}
            >
              {country.value === countryCode ? countryCode : country.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryCode;
