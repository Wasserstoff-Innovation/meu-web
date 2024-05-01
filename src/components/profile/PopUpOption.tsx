const options = [
  { title: "Share Profile", icon: "/icons/share-white.svg", isRed: false },
  { title: "Get Directions", icon: "/icons/explore.svg", isRed: false },
  { title: "Add Note", icon: "/icons/edit.svg", isRed: false },
  { title: "Block", icon: "/icons/block.svg", isRed: true },
  { title: "Remove Connection", icon: "/icons/person_remove.svg", isRed: true },
  { title: "Report", icon: "/icons/warning.svg", isRed: true },
];

const PopUpOption = () => {
  const username = " johndoe";
  return (
    <div
      className="absolute right-5 top-8 bg-[#1A1D21] p-4 rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {options.map((option, index) => (
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
      ))}
    </div>
  );
};

export default PopUpOption;
