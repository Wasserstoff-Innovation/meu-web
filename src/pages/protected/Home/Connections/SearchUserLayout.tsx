import { useState } from "react";
import { IConnection } from "../../../../types/connection";

type SearchUserLayoutProps = {
  data: IConnection[];
  setFilteredData: React.Dispatch<React.SetStateAction<IConnection[]>>;
  children?: React.ReactNode;
};
export default function SearchUserLayout({
  data,
  children,
  setFilteredData,
}: SearchUserLayoutProps) {
  const [searchInput, setSearchInput] = useState("");
  const FilterData = (val: string) => {
    const filterData = data.filter(
      (item) =>
        item.user.name.toLowerCase().includes(val) ||
        item.user.userId.toLowerCase().includes(val)
    );
    setFilteredData(filterData);
  };

  const handleChange = (value: string) => {
    setSearchInput(value);
    const val = value.toLowerCase();
    FilterData(val);
  };
  return (
    <>
      <div className="flex flex-col sticky top-0 gap-4 bg-[#1A1D21] ">
        <div className="flex gap-2 items-center p-2 border-1 bg-[#313437] border-[#A3A5A6] rounded-md">
          <div>
            <img src="./search.svg" alt="" />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => handleChange(e.target.value)}
              value={searchInput}
              placeholder="Search User"
              className="placeholder:text-white bg-[#313437] outline-none"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </>
  );
}
