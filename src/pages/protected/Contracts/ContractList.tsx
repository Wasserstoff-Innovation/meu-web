import { contractdata } from "../../../constants/contractdata";

const ContractCardList = () => {
  return (
    <div className="container mx-auto">
      {contractdata.map((contract, index) => (
        <div
          key={index}
          className=" border-1 border-[#5F6164] rounded-lg shadow-md p-2 mb-4"
        >
          <div className="flex items-center mb-2 text-[#F9F9F9]">
            <span className="text-lg font-thin">{contract.name}</span>
          </div>
          <div className="flex justify-between">
            <div className="mb-1">{contract.user}</div>
            <img src={contract.icon} alt="Icon" className="h-4 w-4 mr-2" />
          </div>

          <div>{contract.date || contract.data}</div>
        </div>
      ))}
    </div>
  );
};

export default ContractCardList;
