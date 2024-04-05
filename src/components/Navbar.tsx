import { useState } from "react";
import { Navbar, NavbarBrand } from "@nextui-org/react";
import TuneRecommendation from "./TuneRecommendation";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [isFilter, setIsFilter] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Navbar className="bg-[#11181C]">
        <NavbarBrand onClick={() => {navigate("/settings")}}>
          <div className="rounded-full size-10 bg-[url('./avatar.png')] bg-cover"></div>
        </NavbarBrand>
        <div className="flex gap-8 sm:px-4">
          <img
            src="./qr_code_scanner.svg"
            alt="qr-code"
            className="size-6 cursor-pointer"
          />
          <img
            src="./tune.svg"
            alt="filter"
            className="cursor-pointer size-6"
            onClick={() => setIsFilter(true)}
          />
        </div>
        {isFilter && <TuneRecommendation setIsFilter={setIsFilter}/>}
      </Navbar>
    </>
  );
}
