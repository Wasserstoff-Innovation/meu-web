export const popupTypes = {
  DEFAULT: "",
  REJECT_REQUEST: "REJECT_REQUEST",
  ACCEPT_REQUEST: "ACCEPT_REQUEST",
  DELETE_CONNECTION: "DELETE_CONNECTION",
};

export type IPopupTypes = keyof typeof popupTypes;
