import HomeLayout from "../Connections/HomeLayout";

import UserList from "../Connections/UserList";

const Connections = () => {
  return (
      <HomeLayout>
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
      </HomeLayout>
  );
};

export default Connections;
