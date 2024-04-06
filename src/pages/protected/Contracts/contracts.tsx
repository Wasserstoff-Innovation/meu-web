import React, { useState } from 'react';
import SearchBox from '../../../components/SearchBox';
import ContractCardList from './ContractList';
import SignOrRemindContract from './SignOrRemindContract';
//import { contracts } from '../../../constants/contractdata'; 
//import Footer from '../../../components/Footer';

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
    <div className='flex flex-col gap-2 m-4'>
      <div className='flex flex-col sticky top-4 -p-6'>
        <div className="flex bg-[#313437] rounded-full mb-2 -p-6">
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
      <div className="rounded-lg -mr-8 -ml-8">
        {activeLink === 'link1' ? (
          <div>
            <ContractCardList />
          </div>
        ) : (
          <div>
            <SignOrRemindContract />
          </div>
        )}
      </div>
      {/* <div className=''>
      <Footer/>
      </div> */}
   
    </div>
  );
}

export default Contracts;
