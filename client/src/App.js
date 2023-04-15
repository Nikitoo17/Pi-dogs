import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./views/landing/Landing";
import Home from "./views/home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/asdasd" element={<Landing />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <h1>Henry Dogs</h1>
    </div>
  );
}

export default App;
