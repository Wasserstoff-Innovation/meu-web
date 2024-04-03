import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import { router } from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div className="max-h-screen w-screen bg-foreground-400 font-mono text-white">
          <div className="flex-1 flex flex-col justify-between h-screen overflow-auto no-scrollbar  max-w-screen-sm px-6   bg-foreground mx-auto  border-4 rounded-lg border-foreground">
            <RouterProvider router={router} />
          </div>
        </div>
      </AuthProvider>
    </Provider>
  );
}

export default App;
