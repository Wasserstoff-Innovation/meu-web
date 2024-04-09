import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="">
      <Button onPress={onOpen} className="">
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        className="bg-[#1A1D21] text-white max-w-[24rem] py-4"
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalBody className="text-[14px]">
                <p className="font-medium">
                  Are you sure you want to delete johndoe from your connections?
                </p>
                <p className="font-normal">
                  You won’t be able to see johndoe’s activity and yours will no
                  longer be visible.
                </p>
              </ModalBody>
              <ModalFooter className="grid grid-cols-2 gap-4 text-white">
                <Button
                  variant="light"
                  onPress={onClose}
                  className="border-1 text-whit rounded-sm"
                >
                  Cancel
                </Button>
                <Button
                  onPress={onClose}
                  className="bg-[#DB4437] rounded-sm text-white font-medium"
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
