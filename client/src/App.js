import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="*" element={<Error />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
