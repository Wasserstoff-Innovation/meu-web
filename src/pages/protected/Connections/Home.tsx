import { ReactNode } from "react";
import Footer from "../../../components/Home/Footer";

interface MyComponentProps {
  children: ReactNode; 
}


const HomeLayout: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2">
      <div>Top bar from kuldeep's code</div>
      {children}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;