import { signOut } from "@junobuild/core";
import { Button } from "@nextui-org/react";

const Home = () => {
  return (
    <div className="flex-1 text-4xl text-white">
      Home
      <Button
        className="text-primary"
        onClick={async () => {
          await signOut();
        }}
      >
        SignOut
      </Button>
    </div>
  );
};

export default Home;
