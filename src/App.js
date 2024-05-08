import Login from "./components/auth/login";
import Register from "./components/auth/register";

import SideBar from "./components/SideBar";
import Home from "./components/Home";

import AdminLogin from "./Admin/AdminLogin"

import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter as Router, Routes, Route, Outlet , Navigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext'
import Profile from "./components/Profile";
import ChangeProfile from "./components/ChangeProfile";
import ChnagePassword from "./components/ChnagePassword";
import Stock from "./components/Stock";
import AddToStock from "./components/AddToStock";

function UserPrivateRoutes() {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? (
    <div className="userDash">
      <SideBar />
      <Outlet/>
    </div>
  ) : (<Navigate to="/login" replace={true}/>)
}

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Public Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* User Private Routes */}
          <Route path="/dashboard" element={<UserPrivateRoutes />} >
            <Route path="*" index element={<h1>Statics Page</h1>}/>

            <Route path="profile" index element={<Profile/>}/>
            <Route path="chnage-password" index element={<ChnagePassword/>}/>
            <Route path="chnage-profile" index element={<ChangeProfile/>}/>
            
            <Route path="stock" index element={<Stock/>}/>
            <Route path="add-to-stock" index element={<AddToStock/>}/>
          </Route>

          {/* User Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Define a default route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
