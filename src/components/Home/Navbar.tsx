import { Avatar, Navbar, NavbarBrand } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function App({ avatar }: { avatar?: string }) {
  const Navigate = useNavigate();

  return (
    <>
      <Navbar className="bg-[#11181C] ">
        <NavbarBrand
          onClick={() => {
            Navigate("/settings");
          }}
        >
          <Avatar src={avatar ? avatar : "./avatar.png"} size="md" />
          {/* <div className=" size-10 ">
            <img src={avatar ? avatar : "./avatar.png"} alt="avatar" className="rounded-full" />
          </div> */}
        </NavbarBrand>
        <div className="flex gap-8 ">
          <img
            src="./qr_code_scanner.svg"
            alt="qr-code"
            className="size-6 cursor-pointer"
            onClick={() => Navigate("/qr-scanner")}
          />
          <img
            src="./tune.svg"
            alt="filter"
            className="cursor-pointer size-6"
            onClick={() => Navigate("/tune-recommendation")}
          />
        </div>
      </Navbar>
    </>
  );
}
