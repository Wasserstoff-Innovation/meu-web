import HomeLayout from "./HomeLayout";
import UserList from "./UserList";

const Requests = () => {
  return (
    <HomeLayout>
      <UserList
        path="requests"
        heading={{
          first: "Are you sure you want to delete the request from johndoe?",
          second: "johndoe will not be notified.",
        }}
        Action="Confirm"
      />
    </HomeLayout>
  );
}

export default Requests