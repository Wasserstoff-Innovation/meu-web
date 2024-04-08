import { useState } from 'react';
import SearchBox from '../../../components/SearchBox';
import ContractCardList from './ContractList';
import SignOrRemindContract from './SignOrRemindContract';
import { Navbar,} from "@nextui-org/react";
//import { contracts } from '../../../constants/contractdata'; 
import Footer from '../../../components/Footer';

function Contracts() {
  const [activeLink, setActiveLink] = useState('link1');
  //const [searchQuery, setSearchQuery] = useState('');

  const handleLinkClick = (link:string) => {
    setActiveLink(link);
  };

  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // };

  // const filteredContracts = contracts.filter((contract) =>
  //   contract.user.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className=''>
      <Navbar className="bg-[#11181C]">
      
      <div className="flex flex-col gap-2 rounded-full mb-2 -p-6 -m-4 relative top-4">
        <div className='flex w-[20rem] mt-4 '>
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
        </div>
    </Navbar>
      <div className="rounded-lg ">
        {activeLink === 'link1' ? (
          <div className='z-0'>
            <ContractCardList />
          </div>
        ) : (
          <div className='z-0'>
            <SignOrRemindContract />
          </div>
        )}
      </div>
      {/* <div className='-m-4'>
      <Footer/>
      </div>  */}
   
    </div>
  );
}

export default Contracts;
