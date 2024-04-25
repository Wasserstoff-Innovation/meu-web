import { useState } from "react";
import { Button, ModalBody, ModalFooter } from "@nextui-org/react";
import { rejectRequest } from "../../api/connect/connection";
import { IConnection } from "../../types/connection";
import { toast } from "react-toastify";
import { useRevalidator } from "react-router-dom";

type DeleteRequestProps = {
  connection: IConnection;
  onClose: () => void;
};

const DeleteRequest = ({ connection, onClose }: DeleteRequestProps) => {
  const [loading, setLoading] = useState(false);
  const revalidator = useRevalidator();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await rejectRequest(connection.connectionId);
      toast.success(response.message);
      revalidator.revalidate();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalBody className="text-[14px] flex flex-col justify-center items-center flex-wrap">
        <p className="font-medium">
          Are you sure you want to delete the request from{" "}
          {connection.user.name}?
        </p>
        <p className="font-normal">
          {connection.user.name} will not be notified.
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
          onClick={handleDelete}
          isDisabled={loading}
          className="bg-[#DB4437] rounded-sm text-white font-medium"
        >
          {loading ? "Deleting..." : "Confirm"}
        </Button>
      </ModalFooter>
    </>
  );
};

export default DeleteRequest;
