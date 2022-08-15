import React from 'react';
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/login/Login";
import {Route,Routes} from "react-router-dom";
import Layout from "./components/Layout";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import Missing from "./pages/Missing";
import Admin from "./pages/Admin";
import Employees from "./pages/Employees";
import Home from "./pages/Home";


const ROLES = {
    'User' : "User",
    'Administrator' : "Administrator"
}

function App() {
  return (
      <Routes>
              {/* public routes */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<Layout />}>

              {/* we want to protect these routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Administrator]}/>}>
                  <Route path="/" element={<Home />} />
              </Route>
              
              <Route element={<RequireAuth allowedRoles={[ROLES.Administrator]} />}>
                  <Route path="admin" element={<Admin />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Administrator]} />}>
                  <Route path="employees" element={<Employees />} />
              </Route>

              {/* catch all */}
              <Route path="*" element={<Missing />} />
          </Route>
      </Routes>
  );
}

export default App;
