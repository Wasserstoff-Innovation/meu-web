interface myProps {
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const TuneRecommendation: React.FC<myProps> = ({ setIsFilter }) => {
  return (
    <div className="h-screen w-full absolute top-0 left-0  bg-[#1A1D21] ">
      <div className="flex p-4 justify-between items-center ">
        <div>
          <img
            src="./close.svg"
            alt="close"
            onClick={() => setIsFilter(false)}
            className="cursor-pointer"
          />
        </div>
        <div>Tune Recommendation</div>
      </div>
    </div>
  );
};

export default TuneRecommendation;
