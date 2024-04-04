// import {
//   Route,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";
// import {
//   OnBoardingLayout,
//   ProtectedLayout,
//   PublicLayout,
//   // PublicLayout,
// } from "../layout/Layout";
// import Home from "../pages/protected/Home";
// import ShareProfile from "../pages/protected/ShareProfile";
// import Login from "../pages/public/Login";
// import RootError from "../layout/RootError";
// import {
//   Ob1,
//   Ob2,
//   Ob3,
//   Ob4,
//   Ob5,
//   Ob6,
//   Ob7,
// } from "../pages/protected/onboarding";

// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<PublicLayout />} errorElement={<RootError />}>
//       <Route path="login" element={<Login />} />
//       <Route path="" element={<ProtectedLayout />}>
//         <Route path="onboard" element={<OnBoardingLayout />}>
//           <Route path="ob1" element={<Ob1 />} />
//           <Route path="ob2" element={<Ob2 />} />
//           <Route path="ob3" element={<Ob3 />} />
//           <Route path="ob4" element={<Ob4 />} />
//           <Route path="ob5" element={<Ob5 />} />
//           <Route path="ob6" element={<Ob6 />} />
//           <Route path="ob7" element={<Ob7 />} />
//         </Route>
//         <Route index path="home" element={<Home />} />
//         <Route path="share-profile" element={<ShareProfile />} />
//       </Route>
//     </Route>
//   )
// );

// createBrowserRouter([
//   {
//     path: "/",
//     Component: ProtectedLayout,
//     errorElement: <RootError />,
//     children: [
//       {
//         path: "",
//         Component: OnBoardingLayout,
//         children: [
//           {
//             path: "ob1",
//             Component: Ob1,
//           },
//           {
//             path: "ob2",
//             Component: Ob2,
//           },
//           {
//             path: "ob3",
//             Component: Ob3,
//           },
//           {
//             path: "ob4",
//             Component: Ob4,
//           },
//           {
//             path: "ob5",
//             Component: Ob5,
//           },
//           {
//             path: "ob6",
//             Component: Ob6,
//           },
//           {
//             path: "ob7",
//             Component: Ob7,
//           },
//         ],
//       },
//       {
//         path: "",
//         Component: Home,
//       },
//       {
//         path: "share-profile",
//         Component: ShareProfile,
//       },
//     ],
//   },
//   {
//     path: "/",
//     Component: PublicLayout,
//     children: [
//       {
//         path: "login",
//         Component: Login,
//       },
//     ],
//   },
// ]);
