import HomeLayout from "./HomeLayout"

import UserList from "./UserList";


const Connections = () => {
  

  return (
    <HomeLayout>
      <UserList isRequest={ false} />
    </HomeLayout>
  );
}

export default Connections