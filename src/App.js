import React from 'react';
import './App.css';
import Register from "./components/Register";
import Login from "./components/login/Login";
import {Route,Routes} from "react-router-dom";
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import Missing from "./components/Missing";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";


const ROLES = {
    'User' : "User",
    'Administrator' : "Administrator"
}



function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              {/* public routes */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="unauthorized" element={<Unauthorized />} />

              {/* we want to protect these routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Administrator]} />}>
                  <Route path="/" element={<Home />} />
              </Route>
              
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                  <Route path="admin" element={<Admin />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Administrator]} />}>
                  <Route path="dashboard" element={<Dashboard />} />
              </Route>

              {/* catch all */}
              <Route path="*" element={<Missing />} />
          </Route>
      </Routes>
  );
}

export default App;
