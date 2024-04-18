import { ReactNode } from "react";
import TopBar from "./TopBar";

interface MyComponentProps {
  children: ReactNode;
}

const HomeLayout: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <>
      <TopBar />
      <div className="flex flex-col gap-4 overflow-y-auto h-[88vh] mt-3">
        {children}
      </div>
    </>
  );
};

export default HomeLayout;
