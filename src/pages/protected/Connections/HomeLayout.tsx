import { ReactNode } from "react";
import Footer from "../../../components/Home/Footer";

interface MyComponentProps {
  children: ReactNode; 
}


const HomeLayout: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <div className="">
      <div>Top bar from kuldeep's code</div>
      <div className="flex flex-col gap-4 overflow-y-auto h-[88vh]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;