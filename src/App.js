import React from 'react';
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/login/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import Missing from "./pages/Missing";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Users from "./pages/users/Users"
import EditUser from "./pages/users/edit/EditUser"
import AddUser from "./pages/AddUser"
import PersistLogin from './components/PersistLogin';


// const ROLES = {
//     'User',
//     'Administrator'
// }

function App() {
    return (
        <Routes>


            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                {/* protected router */}
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={["Administrator"]} />}>
                        <Route path="/" element={<Home />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["Administrator"]} />}>
                        <Route path="admin" element={<Admin />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["Administrator"]} />}>
                        <Route path="users" element={<Users />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["Administrator"]} />}>
                        <Route path="users/:id" element={<EditUser />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["Administrator"]} />}>
                        <Route path="/addUser" element={<AddUser />} />
                    </Route>

                </Route>
                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
