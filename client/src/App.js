import "./App.css";
import Event from "./component/event/Event";
import Login from "./component/login/Login";
import Update from "./component/admin/Update";
import Navbar from "./component/navabar/Navbar";
import Contact from "./component/contact/Contact";
import Profile from "./component/profile/Profile";
import Messages from "./component/admin/Messages";
import Studentlist from "./component/admin/Studentlist";
import CreateEvent from "./component/admin/CreateEvent";
import EditProfile from "./component/profile/EditProfile";
import Registration from "./component/registration/Registration";

import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import SavesEvents from "./component/profile/SavesEvents";
import UpdateEvent from "./component/admin/UpdateEvent";
import Test from "./component/profile/Test";
import AdminPanel from "./component/admin/AdminPanel";
import AllEvent from "./component/admin/AllEvent";
import About from "./component/about/About";
import Aos from "aos";
import { useEffect } from "react";

import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init({ duration: 1200 });
  });

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/about" element={<About />} />
        <Route path="/event" element={<Event />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/test" element={<Test />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit-profile/:id" element={<EditProfile />} />
        {/* <Route path="/Admin" element={<AdminPanel />} /> */}
        <Route path="/profile/saved-events" element={<SavesEvents />} />
        <Route path="/admin/update-event/:id" element={<UpdateEvent />} />
        <Route path="/admin/all-events" element={<AllEvent />} />
        <Route path="/admin/create-event" element={<CreateEvent />} />
        <Route path="/admin/student-list/:id" element={<Studentlist />} />
        <Route path="/admin/all-messages" element={<Messages />} />
        <Route path="/admin/update-event/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
