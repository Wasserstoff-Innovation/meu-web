import HomeLayout from "./HomeLayout";
import UserList from "./UserList";

const Send = () => {
  return (
    <HomeLayout>
      <UserList isRequest={false} />
    </HomeLayout>
  );
};

export default Send;
