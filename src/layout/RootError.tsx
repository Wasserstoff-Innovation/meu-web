import { ReactNode } from "react";
import { useRouteError } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const RootError = (): ReactNode => {
  const err = useRouteError() as Error & {
    status?: number;
    statusText?: string;
    data?: { message: string };
  };
  console.log(err);

  return (
    <>
      <Header />
      <div className="flex flex-1 justify-center items-center">
        <p>
          <strong>Error {err.status || 500}</strong>: {err?.data?.message}
          {err.statusText ?? err.message}
        </p>
      </div>
      <Footer />
    </>
  );
};

export default RootError;
