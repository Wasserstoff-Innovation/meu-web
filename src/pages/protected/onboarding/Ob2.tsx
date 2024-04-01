import { Avatar, Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Ob2 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    //TODO: Validate the form
    navigate("/ob3");
  };
  return (
    <div className="flex flex-1 flex-col justify-between items-end gap-4 py-8 ">
      <h1 className=" self-stretch text-2xl text-primary-300 font-bold">
        Setup your Profile
      </h1>
      <Avatar
        src="https://i.pravatar.cc/150?u=a04258114e29026302d"
        size="lg"
        className="self-center w-32 h-32"
      />
      <div className="w-full">
        <p className="text-white text-sm mb-1">Username </p>
        <Input type="text" placeholder="johndoe" isClearable />
        <p className=" text-white text-xs mt-1">
          Your username can have 2-30 characters and must not include any
          special characters except from “.” & “_”
        </p>
      </div>
      <div className="w-full">
        <p className="text-white text-sm mb-1">Bio </p>
        <Input
          type="text"
          defaultValue="Hi! I’m on MEU, where are you?"
          isClearable
        />
        <p className=" text-white text-xs mt-1">
          Your bio can have 2-150 characters.
        </p>
      </div>
      <div className="w-full">
        <p className="text-white text-sm mb-1">Pronouns </p>
        <Input type="text" placeholder="he/him" isClearable />
        <p className=" text-white text-xs mt-1">
          Your pronouns can have 2-100 characters.
        </p>
      </div>
      <div className="flex w-full justify-end">
        <Button
          className="mt-2 text-sm "
          color="primary"
          size="lg"
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Ob2;
