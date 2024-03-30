import { ReactNode } from "react";
import { useRouteError } from "react-router-dom";

const RootError = (): ReactNode => {
  const err = useRouteError() as Error & {
    status?: number;
    statusText?: string;
  };

  return (
    <div>
      <strong>Error {err.status || 500}</strong>:{" "}
      {err.statusText ?? err.message}
    </div>
  );
};

export default RootError;
