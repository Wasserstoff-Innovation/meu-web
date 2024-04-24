import { useContext, useState } from "react";
import { Button, ModalBody, ModalFooter } from "@nextui-org/react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/Auth";
import { deleteConnection, getConnections } from "../../api/juno/connection";
import { Doc } from "@junobuild/core";
import { IUserwithPrivateData } from "../../types/user";
import { useAppDispatch } from "../../redux/hooks";
import { updateConnections } from "../../redux/features/mainSlice";

type DeleteConnectionProps = {
  connectionDoc: Doc<IUserwithPrivateData>;
  onClose: () => void;
};

const DeleteConnection = ({
  connectionDoc,
  onClose,
}: DeleteConnectionProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteConnection(user, connectionDoc);
      const connections = await getConnections(user);
      console.log("After Deleting",connections);
      if (connections !== undefined) {
        dispatch(updateConnections(connections));
      }
      toast.success(response.message);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete Connection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalBody className="text-[14px] flex flex-col justify-center items-center flex-wrap">
        <p className="font-medium">
          Are you sure you want to delete {connectionDoc.data.name} from your
          connections?
        </p>
        <p className="font-normal">
          You won’t be able to see {connectionDoc.data.name}’s activity and
          yours will no longer be visible.
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

export default DeleteConnection;
