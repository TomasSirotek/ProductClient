import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        // space for navbar => 
        <main className="App">
            <Outlet />
        </main>
        // space for maybe footer 
    )
}

export default Layout;