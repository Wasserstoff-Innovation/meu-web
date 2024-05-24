import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import SplashScreen from "./pages/public/SplashScreen";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 7000); // Adjust the duration as needed

    // Cleanup function
    return () => clearTimeout(timeout);
  }, []);


  return (
    <>
    {loading ? (
        // Render splash screen while loading
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-800 font-mono text-white">
          <SplashScreen />
        </div>
      ) :(
    <div className="max-h-dvh w-screen bg-foreground-400 font-mono text-white">
      <div className="flex-1 flex flex-col justify-start h-dvh overflow-auto no-scrollbar max-w-md bg-foreground mx-auto  ">
        <Provider store={store}>
          <PersistGate loading={<Spinner />} persistor={persistor}>
            <ToastContainer
              position="top-center"
              autoClose={50}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              closeButton={false}
              rtl={false}
              theme="dark"
            />
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </div>
    </div>)}
    </>
  );
}

export default App;
