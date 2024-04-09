import { ReactNode } from "react";
import Footer from "../../../components/Home/Footer";

interface MyComponentProps {
  children: ReactNode;
}

const RootLayout: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <div >
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
