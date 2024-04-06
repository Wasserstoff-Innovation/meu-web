const SearchBox = () => {
  return (
    <div className="relative p-[-10px]">
      <img
        src="/icons/search.svg"
        alt="Search Icon"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white"
      />
      <input
        className="pl-10 w-full bg-[#313437] p-2 rounded-md text-white  focus:border-white"
        placeholder="Search User"
        type="search"
      />
    </div>
  );
};

export default SearchBox;
