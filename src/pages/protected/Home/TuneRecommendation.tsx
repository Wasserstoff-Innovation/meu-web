import { useNavigate } from "react-router-dom";
import SliderRange from "../../../components/Home/SliderRange";
import InputSearch from "../../../components/Home/FilterPage";

const TuneRecommendation = () => {
  const Navigate = useNavigate();
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <img
            src="/icons/close.svg"
            alt="close"
            onClick={() => Navigate("/")}
            className="cursor-pointer"
          />
        </div>
        <div>Tune Recommendation</div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="pt-4">Distance</div>
        <div className="border-1 border-[#A3A5A6] rounded-md flex items-center bg-[#313437]">
          <SliderRange />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>What are you looking for on MEU?</div>
        <div>
          <InputSearch />
        </div>
      </div>
    </div>
  );
};

export default TuneRecommendation;
