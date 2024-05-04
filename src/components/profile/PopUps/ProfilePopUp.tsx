import { useNavigate } from "react-router-dom";

const PopUpOption = () => {
  const username = " johndoe";
  const Navigate = useNavigate();
  return (
    <div
      className="absolute right-3 top-6 bg-[#1A1D21] p-4 rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {/* {options.map((option, index) => (
          <div
            className={`flex gap-4 p-2 cursor-pointer ${
              option.isRed && "text-[#DB4437]"
            }`}
            key={index}
          >
            <img src={option.icon} alt={option.icon} />
            <p>
              {option.title}{" "}
              {(option.title === "Block" || option.title === "Report") &&
                username}
            </p>
          </div>
        ))} */}
      <div
        className="flex gap-4 p-2 cursor-pointer"
        onClick={() => Navigate("/share-profile")}
      >
        <img src="/icons/share-white.svg" alt="share-profile" />
        <p>Share Profile</p>
      </div>

      <div className="flex gap-4 p-2 cursor-pointer">
        <img src="/icons/explore.svg" alt="direction" />
        <p>Get Directions</p>
      </div>

      <div className="flex gap-4 p-2 cursor-pointer">
        <img src="/icons/edit.svg" alt="add note" />
        <p>Add Note</p>
      </div>

      <div className="flex gap-4 p-2 cursor-pointer text-[#DB4437]">
        <img src="/icons/block.svg" alt="block user" />
           <p>Block {username}</p>
      </div>

      <div className="flex gap-4 p-2 cursor-pointer text-[#DB4437]">
        <img src="/icons/person_remove.svg" alt="remove connection" />
        <p>Remove connection</p>
      </div>

      <div className="flex gap-4 p-2 cursor-pointer text-[#DB4437]">
        <img src="/icons/warning.svg" alt="remove connection" />
        <p>Report {username}</p>
      </div>
    </div>
  );
};

export default PopUpOption;
