import HomeLayout from "./HomeLayout";
import UserList from "./UserList";

const Send = () => {
  return (
    <HomeLayout>
      <UserList
        path="send"
        heading={{
          first: "Are you sure you want to delete the request sent to johndoe?",
          second:
            "johndoe will not see your connection request anymore and will not be notified.",
        }}
        Action="Delete"
      />
    </HomeLayout>
  );
};

export default Send;
