import {useState} from "react";
import { Navbar,} from "@nextui-org/react";
import SearchBox from "../../../components/SearchBox";

export default function App(): JSX.Element {
  const [activeLink, setActiveLink] = useState('link1');
  //const [searchQuery, setSearchQuery] = useState('');

  const handleLinkClick = (link:string) => {
    setActiveLink(link);
  };

  return (
    <Navbar className="bg-[#11181C]">
      
      <div className="flex bg-[#c2d8ee] rounded-full mb-2 -p-6">
          <button
            className={`${
              activeLink === 'link1' ? 'bg-[#6E4E51] text-white' : 'bg-gray-200 text-gray-800'
            } rounded-full p-1 focus:outline-none w-1/2`}
            onClick={() => handleLinkClick('link1')}
          >
            Signed
          </button>
          <button
            className={`${
              activeLink === 'link2' ? 'bg-[#6E4E51] text-white' : 'bg-gray-200 text-gray-800'
            } rounded-full p-1 focus:outline-none w-1/2`}
            onClick={() => handleLinkClick('link2')}
          >
            Pending
          </button>
        </div>
        <div className='-mr-8 -ml-8'>
          <SearchBox />
        </div>
    </Navbar>
  );
}
