import { AuthProvider } from "./context/Auth";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MainRouter from "./routes/MainRouter";
import { Layout } from "./layout/Layout";

function App() {
  return (
    <Layout>
      <Provider store={store}>
        <AuthProvider>
            <MainRouter />
        </AuthProvider>
      </Provider>
    </Layout>
  );
}

export default App;
