import UserList from "./Connections/UserList";

const Connections = () => {
  return (
    <>
      <UserList
        path="connections"
        heading={{
          first:
            "Are you sure you want to delete johndoe from your connections?",
          second:
            "You won’t be able to see johndoe’s activity and yours will no longer be visible.",
        }}
        Action="Confirm"
      />
    </>
  );
};

export default Connections;
