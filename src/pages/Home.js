import { useNavigate, Link } from "react-router-dom";
import { useContext ,useState,useEffect} from "react";
import axios from '../api/axios.js';
import AuthContext from "../context/AuthProvider";

const AUTH_URL = '/Product'; 
const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [product, setProducts] = useState([]);

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/login');
    }

  

    useEffect(()=>
    {
        loadAllAPIData();
    }, []);

    const loadAllAPIData = async()=>
    {
        try
        {
            await loadProducts();
      
        }
        catch(err)
        {
            alert("Database connection error...");
        
        }
    }

    const loadProducts=async()=>
    {
        try {
            const response = await axios.get(AUTH_URL,
                JSON.stringify({product}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false 
                }
            );
           // const product = response?.data;
        
            setProducts({product})
          console.log(response?.data)
        } catch (err) {
            if (!err?.response) {

                console.log('nope')
            } else if (err.response?.status === 400) {
                console.log('nope')

              
            } else if (err.response?.status === 401) {
                console.log('nope')

                
                
            } else {
                console.log('nope')

           
            }
        }
    };

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            
            
            <Link to="/dashboard">Go to dashboard</Link>

            {/*<Link to="/linkpage">Go to the link page</Link> */}
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home