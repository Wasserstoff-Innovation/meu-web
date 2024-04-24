import { Modal, ModalContent } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { togglePopup } from "../../redux/features/popupSlice";
import DeleteRequest from "../popups/DeleteRequest";
import DeleteSentRequest from "../popups/DeleteSentRequest";
import { IConnection } from "../../types/connection";
import DeleteConnection from "../popups/DeleteConnection";
import { Doc } from "@junobuild/core";
import { IUserwithPrivateData } from "../../types/user";

const RootPopup = () => {
  const { showPopup, popupType, popupData } = useAppSelector(
    (state) => state.popup
  );
  const dispatch = useAppDispatch();

  return (
    <Modal
      isOpen={showPopup}
      placement="center"
      onOpenChange={() => {
        dispatch(togglePopup());
      }}
      className="bg-[#1A1D21]  text-white max-w-[24rem] py-4"
      hideCloseButton={true}
    >
      <ModalContent>
        {(
          onClose = () => {
            dispatch(togglePopup());
          }
        ) => {
          switch (popupType) {
            case "REJECT_REQUEST":
              return (
                <DeleteRequest
                  onClose={onClose}
                  connection={popupData as IConnection}
                />
              );

            case "DELETE_SENT_REQUEST":
              return (
                <DeleteSentRequest
                  onClose={onClose}
                  connection={popupData as IConnection}
                />
              );

            case "DELETE_CONNECTION":
              return (
                <DeleteConnection
                  onClose={onClose}
                  connectionDoc={popupData as Doc<IUserwithPrivateData>}
                />
              );
            default:
              return <></>;
          }
        }}
      </ModalContent>
    </Modal>
  );
};

export default RootPopup;
