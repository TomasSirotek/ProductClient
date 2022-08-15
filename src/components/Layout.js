import { Outlet } from "react-router-dom"
import Drawer from "./Drawer"

const Layout = () => {
    return (
        // space for navbar => 
        <main className="App">
            <Drawer/>
            <Outlet />
        </main>

    )
}

export default Layout;