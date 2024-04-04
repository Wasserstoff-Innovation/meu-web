// import { LoaderFunctionArgs, redirect } from "react-router-dom";
// import { IAuthContext } from "../context/Auth";

// export const loginLoader = (authContext: IAuthContext) => () => {
//   console.log("loginLoader", authContext);
//   if (authContext.user) {
//     return redirect("/");
//   }
//   return undefined;
// };

// export const protectedLoader =
//   (authContext: IAuthContext) =>
//   ({ request }: LoaderFunctionArgs) => {
//     console.log("protectedLoader", authContext);
//     const { user } = authContext;

//     if (!user) {
//       const params = new URLSearchParams();
//       params.set("from", new URL(request.url).pathname);
//       return redirect("/login?" + params.toString());
//     }
//     return null;
//   };
