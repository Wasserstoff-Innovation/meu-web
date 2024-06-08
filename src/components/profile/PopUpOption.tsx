import React, { useState } from 'react';

type PopUpOptionProps = {
  setToggle: (value: boolean) => void;
};

const options = [
  { title: "Share Profile", icon: "/icons/share-white.svg", isRed: false },
  { title: "Get Directions", icon: "/icons/explore.svg", isRed: false },
  { title: "Add Note", icon: "/icons/edit.svg", isRed: false },
  { title: "Block", icon: "/icons/block.svg", isRed: true },
  { title: "Remove Connection", icon: "/icons/person_remove.svg", isRed: true },
  { title: "Report", icon: "/icons/warning.svg", isRed: true },
];

const PopUpOption: React.FC<PopUpOptionProps> = ({ setToggle }) => {
  const [showTextField, setShowTextField] = useState(false);
  const [note, setNote] = useState('');
  const username = " johndoe";

  const optionClick = (optionTitle: string) => {
    switch (optionTitle) {
      case "Add Note":
        setShowTextField(true);
        break;
      // You can add other cases here if needed
      default:
        // Default action if needed
        break;
    }
  };

  const handleAdd = () => {
    alert(note);
    setShowTextField(false);
    setNote("");
    setToggle(false); // This updates the parent's state to hide the popup
  };

  return (
    <div
      className="absolute right-5 top-8 bg-[#1A1D21] p-4 rounded-lg mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      {options.map((option, index) => (
        <div
          className={`flex gap-4 p-2 cursor-pointer ${option.isRed ? "text-[#DB4437]" : ""}`}
          key={index}
          onClick={() => optionClick(option.title)}
        >
          <img src={option.icon} alt={option.title} />
          <p>
            {option.title}{" "}
            {(option.title === "Block" || option.title === "Report") && username}
          </p>
        </div>
      ))}

      {showTextField && (
        <div className="fixed inset-0 w-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <textarea 
              className="w-full p-2 border rounded text-black" 
              placeholder="Add your note here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <button className="mt-2 p-2 bg-blue-500 w-full text-white rounded" onClick={handleAdd}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpOption;
