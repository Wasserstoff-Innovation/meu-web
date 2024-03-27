
import Header from "./layout/Header";
import Landing from "./pages/Landing";

function App() {
  return (
    <div className="max-h-screen w-screen bg-foreground-400 font-mono   ">
      <div className=" max-w-screen-sm h-screen bg-foreground mx-auto p-8 border-4 rounded-lg border-foreground">
        <Header />
        <main>
         <Landing />
        </main>
      </div>
    </div>
  );
}

export default App;
