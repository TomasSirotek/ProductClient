import { useNavigate, Link } from "react-router-dom";
import { useContext ,useState,useEffect} from "react";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/login');
    }


    return (
        
        <section>
             <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto flex py-4  ">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                </div>
            </header>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            
       
            <br/>
            <Link to="/users">All users</Link>

            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home