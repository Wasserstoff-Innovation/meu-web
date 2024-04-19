import UserList from "./UserList";

const Requests = () => {
  return (
    <>
      <UserList
        path="requests"
        heading={{
          first: "Are you sure you want to delete the request from johndoe?",
          second: "johndoe will not be notified.",
        }}
        Action="Confirm"
      />
    </>
  );
}

export default Requests