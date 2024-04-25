import { contracts } from "../../../../constants/contractdata";
import {

  Button,
  Modal,
  ModalContent,

  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
const SignOrRemindContract = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };
  return (
    <div className="container mx-auto mt-4">
      {contracts.map((contract, index) => (
        <div
          key={index}
          className="rounded-lg shadow-md p-2 mb-2 border-1 border-[#5F6164]"
        >
          <span className="text-[16px]">{contract.name}</span>
          <div className=" flex justify-between">
            <div className="text-[12px]">{contract.user}</div>
            <div className="flex gap-3">
              <button className="bg-blue-500 hover:bg-blue-700 text-white  px-3 rounded-full">
                {contract.button}
              </button>
              <div onClick={() => handleOpen()}>
                <img src={contract.icon} />
              </div>
              <Modal backdrop="transparent" isOpen={isOpen} onClose={onClose} 
              className="bg-[#1A1D21] text-white  justify-between overflow-auto no-scrollbar max-w-sm mx-auto  ">
                <ModalContent className=" flex flex-col justify-center item-center">
                  {(onClose) => (
                    <>
                      <ModalBody>
                        <p>
                        Are you sure you want to delete the contract sent to <b>{contract.user}</b>
                        </p>
                        <p>
                        <b>{contract.user} </b>will not see your contract request and will not notified
                        </p>
                      </ModalBody>
                      <ModalFooter className="flex justify-around ">
                        <Button
                          className="text-white"
                          variant="light"
                          onPress={onClose}
                        >
                          Cancel
                        </Button>
                        <Button className="bg-[#DB4437] text-white" onPress={onClose}>
                          Delete
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
          <div className="text-[12px]">{contract.date}</div>
        </div>
      ))}
    </div>
  );
};

export default SignOrRemindContract;
