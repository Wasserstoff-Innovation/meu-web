import { useState } from "react";
import { Navbar, NavbarBrand } from "@nextui-org/react";
import TuneRecommendation from "./TuneRecommendation";

export default function App() {
  const [isFilter, setIsFilter] = useState(false);

  return (
    <>
      <Navbar className="bg-[#11181C]">
        <NavbarBrand>
          <div className="rounded-full size-10 bg-[url('https://s3-alpha-sig.figma.com/img/41bd/111a/617b61c4709a03d3444b62e630fc9ca2?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fzFa2JZZQFXYmu2ML7zzufdA3URFClJHqeYGy2ifR40nDr8gYWI4FktGK4hFqXsnJ6GA~J3JhYmZLcNlSJKFvzY5mV6DQXcLnFAHIAJFlz2oKeIu6hXZuaeCgCXFt8j1anZ9MtY9vsvnN5scB1LgR9S30lC-p05jU3YBJkkYurfQ787CAo7TMJD53IHpHrK-cXQ45PIIQJam5iH~Nm3MZZAjL2nxljDTiZ0D-0C0udb1sfeghjooJ~LiPL-0l91dwifpbYgpOv9ygcVaDUX3eL5KGB1o8F3WaIbc2jbjx~t5enk2byc3YLnN3jSUGDHETbewpqKjQtyex4ryK6S0QA__')] bg-cover"></div>
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
