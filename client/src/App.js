import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login.js";
import Register from "./routes/Register.js";
import Error from "./components/Error";
import CreateComplaint from "./components/CreateComplaint";
import Dashboard from "./components/Dashboard";
import Homepage from "./routes/Homepage.js";
import GetComplaint from "./components/GetComplaint";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/createcomplaint" element={<CreateComplaint />} />
        <Route path="/getcomplaint" element={<GetComplaint />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
