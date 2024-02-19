import { Outlet, Route, Routes } from "react-router";
// import Home from "./pages/Home";
import AddVehicle from "./pages/add-vehicle";
import Profile from "./pages/Profile";
import { Logout } from "./components/Logout";


function App() {
  return (
    <div>
      <Outlet />
    <Routes>
          <Route index element={<Profile />} />
          <Route path="add-vehicle" element={<AddVehicle />} />
          <Route path="logout" element={<Logout/>} />
    </Routes>
    </div>
  );
}

export default App;
