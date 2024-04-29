// import { useState } from "react";
// import SearchBox from "../../../../components/SearchBox";
// import ContractCardList from "./ContractList";
// import SignOrRemindContract from "./SignOrRemindContract";

function Contracts() {
  // const [activeLink, setActiveLink] = useState("link1");
  // const handleLinkClick = (link: string) => {
  //   setActiveLink(link);
  // };
  return (
    <div className="p-6 text-center flex-1 flex  justify-center items-center">
      Coming soon
      {/* <div className="sticky top-0 -mx-6 bg-[#11181C]">
        <div className="flex flex-col gap-2 rounded-full">
          <div className="flex p-2 px-6">
            <button
              className={`${
                activeLink === "link1"
                  ? "bg-[#6E4E51] text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-full p-1 focus:outline-none w-1/2`}
              onClick={() => handleLinkClick("link1")}
            >
              Signed
            </button>
            <button
              className={`${
                activeLink === "link2"
                  ? "bg-[#6E4E51] text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-full p-1 focus:outline-none w-1/2`}
              onClick={() => handleLinkClick("link2")}
            >
              Pending
            </button>
          </div>

          <div className="px-6">
            <SearchBox/>
          </div>
        </div>
      </div>
      <div className="rounded-lg ">
        {activeLink === "link1" ? (
          <div className="">
            <ContractCardList />
          </div>
        ) : (
          <div className="">
            <SignOrRemindContract />
          </div>
        )}
      </div> */}
    </div>
  );
}

export default Contracts;
