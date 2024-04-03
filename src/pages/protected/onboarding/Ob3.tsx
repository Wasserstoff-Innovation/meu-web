import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { interests } from "../../../constants/interests";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserData } from "../../../redux/features/onBoardingSlice";
// import { CustomCheckbox } from "../../../components/CustomCheckbox";
// import { useState } from "react";

interface Interest {
  label: string;
  value: string;
}

const Ob3 = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.onBoarding);

  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [userInterest, setUserInterest] = useState(interests);
  const [active, setActive] = useState(false);

  const [groupSelected, setGroupSelected] = useState<Interest[]>([]);

  const FilteredData = (value: string) => {
    const filterInterest = interests.filter((interest) =>
      interest.label.toLowerCase().includes(value.toLowerCase())
    );
    setUserInterest(filterInterest);
  };

  const handleClick = (value: string) => {
    const find = groupSelected.find((interest) => interest.value === value);
    if (find) {
      return;
    }
    const selectedInterest = userInterest.find(
      (interest) => interest.value === value
    );
    if (selectedInterest) {
      setGroupSelected((prev) => [...prev, selectedInterest]);
    }
    setSearchInput("");
  };

  const handleRemove = (value: string) => {
    const selectedInterestIndex = groupSelected.findIndex(
      (interest) => interest.value === value
    );

    if (selectedInterestIndex !== -1) {
      // Remove from userInterest
      const updatedUserInterest = [...groupSelected];
      updatedUserInterest.splice(selectedInterestIndex, 1);
      setGroupSelected([...updatedUserInterest]);
    }
    setSearchInput("");
  };

  const handleNext = () => {
    //TODO: Validate the form
    if (groupSelected.length < 3) {
      console.log("Selected Interest must be greater than 2.");
      return;
    }
    const updatedUserData = {
      ...userData,
      Interests: groupSelected,
    };
    dispatch(updateUserData(updatedUserData));
    navigate("/ob4");
  };

  return (
    <div
      className="flex flex-1 flex-col justify-between items-end gap-4 py-8 "
      onClick={() => setActive(false)}
    >
      <h1 className=" self-stretch text-2xl text-primary-300 font-bold">
        Add your Interests
      </h1>
      <div className="w-full flex flex-col gap-4">
        <p className="text-white text-xs mt-1 ">
          Add a minimum of 3 interests and a maximum of 20 interest.
        </p>

        {/* changes by amit */}
        <div className=" flex flex-col">
          {/* search  */}
          <div
            className="h-10 bg-[#313437] flex items-center justify-center p-2 gap-2 border-[#4A4D50] border-[3px] rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              setActive(true);
            }}
          >
            <img src="./search.svg" alt="search" />
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
          {/* select tab */}
          <div
            className={`${
              active &&
              "p-2 flex flex-col gap-2 bg-white text-black font-thin rounded-md"
            }  `}
          >
            {active &&
              userInterest.length > 0 &&
              userInterest.map((interest, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={(e) => {
                    handleClick(interest.value);
                    e.stopPropagation();
                  }}
                >
                  {interest.label}
                </div>
              ))}
          </div>

          {/* render the selected groups */}
          {groupSelected.length > 0 && (
            <div className="flex  py-4 flex-wrap p-2 gap-2 border-[2px] border-[#4E5052] my-4 rounded-md">
              {groupSelected.map((select, index) => (
                <div
                  key={index}
                  className="bg-white text-black flex gap-2 p-2 px-4 rounded-full text-[14px] font-medium"
                >
                  <div>{select.label}</div>
                  <button onClick={() => handleRemove(select.value)}>x</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full justify-end">
        <Button
          className="mt-2 text-sm "
          color="primary"
          size="lg"
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Ob3;
