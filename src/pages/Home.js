import { useNavigate, Link } from "react-router-dom";
import { useContext ,useState,useEffect} from "react";
import AuthContext from "../context/AuthProvider";


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
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            
            
            <Link to="/dashboard">Go to dashboard</Link>
            <br/>
            <Link to="/employees">Employees List</Link>


            {/*<Link to="/linkpage">Go to the link page</Link> */}
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home