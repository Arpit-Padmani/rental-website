import { Route, Routes } from 'react-router';
import './App.css';
import { Products } from './pages/Products';
import { Home } from './pages/Home';
import Contactus from './pages/Contactus';
import Login from './pages/Login';
import Register from './pages/Register';
import Extra from './pages/Extra';
import { UserProvider } from "./redux/UserContext";
import { Logout } from './pages/Logout';
import AdminApp from './admin/AdminApp';
function App() {

  return (
    <div>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/extra' element={<Extra />} />
          <Route path='/logout' element={<Logout />}/>
          <Route path='/admin/*' element={<AdminApp />} />

        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
