import { AuthProvider } from "./context/Auth";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Spinner } from "@nextui-org/react";

function App() {
  return (
    <div className="max-h-screen w-screen bg-foreground-400 font-mono text-white">
      <div className="flex-1 flex flex-col justify-between h-screen overflow-auto no-scrollbar max-w-md px-6  bg-foreground mx-auto  ">
        <Provider store={store}>
          <PersistGate loading={<Spinner />} persistor={persistor}>
            <AuthProvider>
              <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                closeButton={false}
                rtl={false}
                theme="dark"
              />
              <RouterProvider router={router} />
            </AuthProvider>
          </PersistGate>
        </Provider>
      </div>
    </div>
  );
}

export default App;
