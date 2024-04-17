const Purpose = ({ purpose }: { purpose: string }) => {
  return (
    <div className="flex flex-col p-1">
      <h1>Purpose</h1>
      <div className="flex text-black ">
        <img
          src="../search-black.svg"
          alt="search"
          className="bg-white p-2 rounded-l-full"
        />
        <h3 className="text-[1rem] bg-white p-1 rounded-r-full">{purpose}</h3>
      </div>
    </div>
  );
};

export default Purpose;
