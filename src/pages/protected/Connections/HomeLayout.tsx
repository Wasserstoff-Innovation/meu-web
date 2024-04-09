import { ReactNode } from "react";
import TopBar from "./TopBar";
import Layout from '../../protected/Home/Layout'

interface MyComponentProps {
  children: ReactNode;
}

const HomeLayout: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <Layout>
      <TopBar />
      <div className="flex flex-col gap-4 overflow-y-auto h-[88vh] mt-3">
        {children}
      </div>
    </Layout>
  );
};

export default HomeLayout;
