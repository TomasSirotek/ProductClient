import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";


const PersistLogin = () => {
    const [isLoading, setLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
              await refresh();
              // console.log('ahoj')
            }
            catch (err){
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        }
        !auth?.token ? verifyRefreshToken() : setLoading(false);
    }, [])

    // tests
    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`token : ${JSON.stringify(auth?.token)}`)

    }, [isLoading])

    return (
        <>
            {isLoading
                ? <p>Loading,,,,</p>
                : <Outlet />}
        </>
    )

}

export default PersistLogin;