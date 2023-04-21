import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./views/landing/Landing";
import Home from "./views/home/Home";
import Details from "./views/Details";
import FormPage from "./views/FormPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </div>
  );
}

export default App;
