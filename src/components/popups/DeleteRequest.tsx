import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { Button, ModalBody, ModalFooter } from "@nextui-org/react";
import { togglePopup } from "../../redux/features/popupSlice";
import { rejectRequest } from "../../api/connect/connection";

type DeleteRequestProps = {
  id: string;
  userCardId: string | undefined;
  onClose: () => void;
};

const DeleteRequest = ({ id, userCardId, onClose }: DeleteRequestProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      if (!userCardId) return;
      await rejectRequest(id, userCardId);
      dispatch(togglePopup());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalBody className="text-[14px] flex flex-col justify-center items-center flex-wrap">
        <p className="font-medium">Are you sure?</p>
        <p className="font-normal">You want to delete this card?</p>
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
          isDisabled={loading}
          className="bg-[#DB4437] rounded-sm text-white font-medium"
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </ModalFooter>
    </>
  );
};

export default DeleteRequest;
