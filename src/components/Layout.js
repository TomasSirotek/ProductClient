import { Outlet } from "react-router-dom"

import Navbar from "./Navbar"

const Layout = () => {
    return (
        // space for navbar => 
        <main className="App">
            {/* nav stays same  */}
            <Navbar />
            
            <main>
                <div className="max-w-7xl mx-auto py-1 sm:px-6 lg:px-8">
                    {/* Replace with your content */}
                    <div className="px-4 py-3 sm:px-0">
                        <div className=" h-96 " >

                            <Outlet />

                        </div>
                    </div>
                    {/* /End replace */}
                </div>
            </main>


        </main>

    )
}

export default Layout;