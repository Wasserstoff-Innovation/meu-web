import { AuthProvider } from "./context/Auth";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <div className="max-h-screen w-screen bg-foreground-400 font-mono text-white">
      <div className="flex-1 flex flex-col justify-between h-screen overflow-auto no-scrollbar max-w-md px-6  bg-foreground mx-auto  ">
        <Provider store={store}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </Provider>
      </div>
    </div>
  );
}

export default App;
