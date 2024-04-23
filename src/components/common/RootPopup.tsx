import { Modal, ModalContent } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { togglePopup } from "../../redux/features/popupSlice";
import DeleteRequest from "../popups/DeleteRequest";

const RootPopup = () => {
  const { showPopup, popupType, popupData } = useAppSelector(
    (state) => state.popup
  );
  const { userDoc } = useAppSelector((state) => state.main);
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
            case "deleteRequest":
              return (
                <DeleteRequest
                  onClose={onClose}
                  id={popupData as string}
                  userCardId={userDoc?.data.userId}
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
