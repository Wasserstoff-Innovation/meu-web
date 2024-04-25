import { CONNECT_API_URL } from "./userCard";

export const sendAPIRequest = async (
  url: string,
  method: "GET" | "POST" = "GET",
  body?: unknown
  // userid?: string
) => {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };
  const userid = sessionStorage.getItem("cardId");
  if (userid) {
    headers["userid"] = userid;
  }

  const response = await fetch(`${CONNECT_API_URL}${url}`, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();
  if (response.status === 200) {
    return data;
  } else {
    throw new Error(data.message);
  }
};
