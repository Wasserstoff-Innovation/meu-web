import { useNavigate  } from "react-router-dom";


const RateMeu = () => {
  // State variables for each switch
  const Navigate =useNavigate ();
  const backNavigate = () =>{
    Navigate("/settings")
  }

  return (
    <div className="flex flex-col justify-between gap-6">
      <div className="flex gap-2 text-2xl z-10 relative top-4 left-0 items-center ">
        <img src="/icons/left-arrow.svg" alt="back-navigation" className="w-4 h-4 cursor-pointer"
        onClick={backNavigate}
        />
        <div>Rate</div>
      </div>
      {/* rest code here */}
    </div>
  );
};

export default RateMeu;
