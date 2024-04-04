interface MyComponentProps {
  title: string;
  icon: string;
}

const CustomButton: React.FC<MyComponentProps> = ({ title, icon }) => {
  return (
    <div className="bg-[#1272BA] flex justify-center gap-4 p-3 rounded-md cursor-pointer">
      <img src={icon} alt={icon} />
      <button className="text-[1.4rem]">{title}</button>
    </div>
  );
};

export default CustomButton;

// title="Share Profile" icon="./Share Button.svg"
