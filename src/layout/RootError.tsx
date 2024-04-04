import { ReactNode } from "react";
// import { useRouteError } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const RootError = (): ReactNode => {
  // const err = useRouteError() as Error & {
  //   status?: number;
  //   statusText?: string;
  // };

  return (
    <>
      <Header />
      <div className="flex flex-1 justify-center items-center">
        <strong>Page Not Found</strong>
      </div>
      <Footer />
    </>
  );
};

export default RootError;
