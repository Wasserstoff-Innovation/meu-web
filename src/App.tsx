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
import { getIsAuthenticated } from "./utils";

function App() {

  const [loading, setLoading] = useState(true);
  const [splash, setSplash] = useState(false)

  useEffect(() => {

    splashLoader()

    // Simulate loading process
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 4000); // Adjust the duration as needed

    // Cleanup function
    return () => clearTimeout(timeout);
  }, []);

  const splashLoader = async () => {
    const isAuthenticated = await getIsAuthenticated();
    if (isAuthenticated) {
      setSplash(true)
    }
    return null;
  };

  return (
    <>
      <div className="max-h-dvh w-screen bg-foreground-400 font-mono text-white">
        <div className="flex-1 flex flex-col justify-start h-dvh overflow-y-auto overflow-x-hidden no-scrollbar max-w-md bg-foreground mx-auto  ">
          <Provider store={store}>
            <PersistGate loading={<Spinner />} persistor={persistor}>
              {loading && !splash ? (
                // Render splash screen while loading
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                  <SplashScreen />
                </div>
              ) : (
                <div>
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
                </div>
              )}

            </PersistGate>
          </Provider>
        </div>
      </div>
    </>
  );
}

export default App;
