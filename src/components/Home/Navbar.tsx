import { Navbar, NavbarBrand } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar className="bg-[#11181C] ">
        <NavbarBrand onClick={() => {
          navigate("/settings")
        }}>
          <div className=" size-10 ">
            <img src="./avatar.png" alt="avatar" className="rounded-full" />
          </div>
        </NavbarBrand>
        <div className="flex gap-8 ">
          <img
            src="./qr_code_scanner.svg"
            alt="qr-code"
            className="size-6 cursor-pointer"
          />
          <img
            src="./tune.svg"
            alt="filter"
            className="cursor-pointer size-6"
            onClick={() => navigate("/tune-recommendation")}
          />
        </div>
      </Navbar>
    </>
  );
}
