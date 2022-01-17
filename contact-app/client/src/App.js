import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <div className="sidebar"> side bar</div>
      <div className="main-wrapper">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
