import React from "react";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const Navigate = useNavigate();
  const pathName = window.location.pathname;
  return (
    <div className=" -mx-6 p-4 flex flex-col gap-4">
      <div className="bg-[#313437] rounded-full p-2  flex justify-between items-center">
        <div
          className={`cursor-pointer ${
            pathName === "/connections" && "bg-[#6E4E51] p-2 px-4 rounded-full"
          }`}
          onClick={() => Navigate("/connections")}
        >
          Connections
        </div>
        <div
          className={` cursor-pointer ${
            pathName === "/requests" && "bg-[#6E4E51] p-2 px-4 rounded-full"
          }`}
          onClick={() => Navigate("/requests")}
        >
          Requests
        </div>
        <div
          className={` cursor-pointer ${
            pathName === "/send" && "bg-[#6E4E51] p-2 px-4 rounded-full"
          }`}
          onClick={() => Navigate("/send")}
        >
          Send
        </div>
      </div>
    </div>
    // <Navbar className="bg-[#11181C] ">
    //   <div className="bg-[#313437] rounded-full p-2 py-4 text-[14px] flex justify-between w-full">
    //     <div className="flex justify-center">
    //       connections
    //     </div>
    //     <div>2</div>
    //     <div>3</div>
    //   </div>
    // </Navbar>
  );
};

export default App;
