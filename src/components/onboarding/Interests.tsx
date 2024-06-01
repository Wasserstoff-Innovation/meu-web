import { interests } from "../../constants/interests";
import React, { useState } from "react";

interface MyProps {
  active:boolean,
  setActive:(props : boolean) => void,
  groupSelected:string [],
  setGroupSelected: (props:string [])=>void;
}

const Interests:React.FC<MyProps> = ( {active,setActive,groupSelected,setGroupSelected} ) => {
  
  const [searchInput, setSearchInput] = useState("");
  const [userInterest, setUserInterest] = useState(interests);
  // const [active, setActive] = useState(false);
  // const [groupSelected, setGroupSelected] = useState<typeof interests>([]);

  const FilteredData = (value: string) => {
    const filterInterest = interests.filter((interest) =>
      interest.toLowerCase().includes(value.toLowerCase())
    );
    setUserInterest(filterInterest);
  };

  const handleClick = (value: string) => {
    const find = groupSelected.find((interest) => interest === value);
    if (find) {
      return;
    }
    const selectedInterest = userInterest.find(
      (interest) => interest === value
    );
    if (selectedInterest) {
      setGroupSelected( [...groupSelected, selectedInterest]);
    }
    setSearchInput("");
  };

  const handleRemove = (value: string) => {
    const selectedInterestIndex = groupSelected.findIndex(
      (interest) => interest === value
    );

    if (selectedInterestIndex !== -1) {
      // Remove from userInterest
      const updatedUserInterest = [...groupSelected];
      updatedUserInterest.splice(selectedInterestIndex, 1);
      setGroupSelected([...updatedUserInterest]);
    }
    setSearchInput("");
  };

  

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <p className="text-white text-xs mt-1 ">
          Add a minimum of 3 interests and a maximum of 20 interest.
        </p>

        {/* changes by amit */}
        <div className=" flex flex-col">
          {/* search  */}
          <div
            className="h-10 border bg-[#313437] flex items-center p-2 gap-2 border-gray-400 border-[2px] rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              setActive(true);
            }}
          >
            <div><img src="/icons/search.svg" alt="search" /></div>
            <div>
              <input
                type="text"
                name="searchInput"
                id=""
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  FilteredData(e.target.value);
                }}
                value={searchInput}
                className=" bg-[#313437] w-full outline-none placeholder:text-white"
                placeholder="Search"
                // onFocus={() => setActive(true)}
              />
            </div>
          </div>
          {/* select tab */}
          <div
            className={`${
              active &&
              " p-2 flex flex-col gap-2 bg-white text-black font-thin rounded-md"
            }  `}
          >
            {active &&
              userInterest.length > 0 &&
              userInterest.map((interest, index) => (
                <div
                  key={index}
                  className="cursor-pointer text-[13px]"
                  onClick={(e) => {
                    handleClick(interest);
                    e.stopPropagation();
                  }}
                >
                  {interest}
                </div>
              ))}
          </div>

          {/* render the selected groups */}
          {groupSelected.length > 0 && (
            <div className="flex  py-4 flex-wrap p-2 gap-2 border border-[2px] border-gray-400 my-4 rounded-md  bg-[#313437]">
              {groupSelected.map((select, index) => (
                <div
                  key={index}
                  className="bg-white text-black flex gap-2 p-2 px-4 rounded-full text-[14px] "
                >
                  <div className="font-medium">{select}</div>
                  <button onClick={() => handleRemove(select)}>x</button>
                </div>
              ))}
            </div>
          )}
          {/* {groupSelected.length==0 && <div>There is not selected interest</div>} */}
        </div>
      </div>

      </>
  );
};

export default Interests;
