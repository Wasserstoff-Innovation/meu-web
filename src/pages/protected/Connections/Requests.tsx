import HomeLayout from "./HomeLayout";
import UserList from "./UserList";

const Requests = () => {
  return (
    <HomeLayout>
      <UserList isRequest={false} />
    </HomeLayout>
  );
}

export default Requests