import { Outlet } from "react-router-dom"

import Navbar from "./Navbar"

const Layout = () => {
    return (
        // space for navbar => 
        <main className="App">
            <Navbar/>
            <Outlet />
    
        </main>

    )
}

export default Layout;