import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login.js";
import Register from "./routes/Register.js";
import Error from "./components/Error";
import CreateComplaint from "./components/CreateComplaint";
import Dashboard from "./components/Dashboard";
import Homepage from "./routes/Homepage.js";
import Mainpage from "./routes/Mainpage.js";
import GetComplaint from "./components/GetComplaint";
import YourComplaint from "./components/YourComplaint.js";
import Inbox from "./components/Inbox.js";
import Comment from "./components/Comment.js";
import Inpage from "./routes/Inpage.js";
import TimeTable from "./components/TimeTable.js";
import AfterLogin from "./components/AferLogin.js";
import MyChart from "./components/Chart.js";
import ProfilePage from "./components/ProfilePage.js";
import Inuser from "./components/Inuser.js";
import GetUser from "./components/GetUser.js";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<Login />}></Route>s
        <Route path="/register" element={<Register />} />
        <Route path="/mainpage" element={<Mainpage />}>
          <Route path="allcomplaint" element={<GetComplaint />}></Route>
          <Route path="yourcomplaint" element={<YourComplaint />}></Route>
          <Route path="createcomplaint" element={<CreateComplaint />}></Route>
          <Route path="inbox" element={<Inbox />}></Route>
          <Route path=":id" element={<Inpage />}></Route>
          <Route path="timetable" element={<TimeTable />}></Route>
          <Route path="afterlogin" element={<AfterLogin />}></Route>
          <Route path="myprofile" element={<ProfilePage />}></Route>
          <Route path="reviewchart" element={<MyChart />}></Route>
          <Route path="allusers" element={<GetUser />}></Route>
        </Route>
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
