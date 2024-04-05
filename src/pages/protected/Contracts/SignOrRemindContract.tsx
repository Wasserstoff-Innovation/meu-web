import { contracts } from "../../../constants/contractdata";

const SignOrRemindContract = () => {
  return (
    <div className="container mx-auto mt-8">
      {contracts.map((contract, index) => (
        <div key={index} className="rounded-lg shadow-md p-2 mb-2 border-1 border-[#5F6164]">
          <span className="text-xl">{contract.name}</span>
        <div className=" flex justify-between">
            <div>{contract.user}</div>
          <div  className="flex gap-3">
            <button className="bg-blue-500 hover:bg-blue-700 text-white  px-3 rounded-full">
              {contract.button}
            </button>
            <img src={contract.icon} />
          </div>
          </div>
          <div className="text-gray-600">{contract.date}</div>
        </div>
      ))}
    </div>
  );
};

export default SignOrRemindContract;
