import { Avatar, Navbar, NavbarBrand } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

export default function App() {
  const Navigate = useNavigate();
  const { userDoc } = useAppSelector((state) => state.main);

  return (
    <>
      <Navbar className="bg-[#11181C] ">
        <NavbarBrand
          onClick={() => {
            Navigate("/settings");
          }}
        >
          <Avatar
            src={userDoc?.data.avatar ? userDoc?.data.avatar : "./avatar.png"}
            size="md"
          />
        </NavbarBrand>
        <div className="flex gap-8 ">
          <img
            src="/icons/qr_code_scanner.svg"
            alt="qr-code"
            className="size-6 cursor-pointer"
            onClick={() => Navigate("/qr-scanner")}
          />
          <img
            src="/icons/tune.svg"
            alt="filter"
            className="cursor-pointer size-6"
            onClick={() => Navigate("/tune-recommendation")}
          />
        </div>
      </Navbar>
    </>
  );
}
