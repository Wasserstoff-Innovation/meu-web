import { ConnectionData } from "./ConnectionsData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface MyProps {
  path: string;
  heading: {
    first: string;
    second: string;
  };
  Action: string;
}

const UserList: React.FC<MyProps> = ({ path,heading,Action }) => {
  const Navigate = useNavigate();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [id, setId] = useState<number>(0);
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(ConnectionData);
  const [userConnections, setUserConnection] = useState(ConnectionData);

  const FilterData = (val: string) => {
    const filterData = data.filter(
      (connection) =>
        connection.username.toLowerCase().includes(val) ||
        connection.name.toLowerCase().includes(val)
    );
    setUserConnection(filterData);
  };

  const handleChange = (value: string) => {
    setSearchInput(value);
    const val = value.toLowerCase();
    FilterData(val);
  };

  const handleDelete = (id: number) => {
    if (id !== 0) {
      const tempArr = data.filter((connection) => connection.id !== id);
      setUserConnection(tempArr);
      setData(tempArr);
      // handleChange(searchInput);
      console.log("user delete with the id : ", id);
    }
  };

  const handleAccept = (id: number) => {
    console.log("Accept Function Called with the id : ", id);
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
        <div className=" flex items-center justify-between p-2 border-1 bg-[#313437]  border-[#A3A5A6] rounded-md ">
          <div className="flex items-center gap-4">
            <div>
              <img
                src="./avatar.png"
                alt="avatar"
                className="size-[50px] rounded-full cursor-pointer"
                onClick={() => Navigate("/")}
              />
            </div>
            <div className="flex flex-col justify-center text-[12px]">
              <div>Invite contact on MEU</div>
              <div className="text-[10px]">meu.com/johndoe</div>
            </div>
          </div>
          <div className="px-2">
            <img
              src="./share.svg"
              alt="share"
              className="w-[18px] h-[20px] cursor-pointer"
              onClick={()=>Navigate('/share-profile')}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {userConnections.map((connection) => (
            <div key={connection.id} className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div>
                    <img
                      src="./avatar.png"
                      alt="avatar"
                      className="size-[50px] rounded-full cursor-pointer"
                      onClick={() => Navigate("/")}
                    />
                  </div>
                  <div className="flex flex-col justify-center text-[12px]">
                    <div>{connection.name}</div>
                    <div className="text-[10px]">{connection.username}</div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  {path === "requests" && (
                    <div
                      className="bg-[#1272BA] p-1 text-[10px] px-4   rounded-full cursor-pointer shadow-sm"
                      onClick={() => handleAccept(connection.id)}
                    >
                      Accept
                    </div>
                  )}
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      onOpen();
                      setId(connection.id);
                    }}
                  >
                    <div className="">
                      <img src="./close.svg" alt="close" className="size-3" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center px-4 gap-4">
                <div>
                  <img
                    src="./icons/info.svg"
                    alt="info"
                    className="size-4 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="text-[10px]">
                    You both connected at {connection.connectedLocation} <br />{" "}
                    on {connection.connectedDate}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* modal code */}
      <div className="">
        <Modal
          isOpen={isOpen}
          placement="center"
          onOpenChange={onOpenChange}
          className="bg-[#1A1D21]  text-white max-w-[24rem] py-4"
          hideCloseButton={true}
        >
          <ModalContent>
            {(onClose: () => void) => (
              <>
                <ModalBody className="text-[14px] flex flex-col justify-center items-center flex-wrap">
                  <p className="font-medium">
                    {heading.first}
                  </p>
                  <p className="font-normal">
                    {heading.second}
                  </p>
                </ModalBody>
                <ModalFooter className="grid grid-cols-2 gap-4 text-white">
                  <Button
                    variant="light"
                    onPress={() => {
                      onClose();
                    }}
                    className="border-1 text-whit rounded-sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      onClose();
                      handleDelete(id);
                    }}
                    className="bg-[#DB4437] rounded-sm text-white font-medium"
                  >
                    {Action}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      {/* modal end */}
    </>
  );
};

export default UserList;
