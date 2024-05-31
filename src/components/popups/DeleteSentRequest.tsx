import { useState } from "react";
import { Button, ModalBody, ModalFooter } from "@nextui-org/react";
import { cancelRequest } from "../../api/connect/connection";
import { IConnection } from "../../types/connection";
import { toast } from "react-toastify";
import { useNavigate, useRevalidator } from "react-router-dom";

type DeleteSentRequestProps = {
  connection: IConnection;
  onClose: () => void;
};

const DeleteSentRequest = ({ connection, onClose }: DeleteSentRequestProps) => {
  const revalidator = useRevalidator();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      if (!id) return;
      const response = await cancelRequest(id);
      console.log(response);
      revalidator.revalidate();
      onClose();
      navigate("/sent")
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
          Are you sure you want to delete the request sent to{" "}
          {connection.user.name}?
        </p>
        <p className="font-normal">
          {connection.user.name} will not see your connection request anymore
          and will not be notified.
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
            handleDelete(connection.connectionId);
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

export default DeleteSentRequest;
