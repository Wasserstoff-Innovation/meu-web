import { ReactNode } from "react";
import Footer from "../../../components/Home/BottomNav";

interface MyComponentProps {
  children: ReactNode;
}

const RootLayout: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto h-[88vh] mt-3">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
