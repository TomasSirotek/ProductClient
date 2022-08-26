import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


const PersistLogin = () => {
    const [isLoading, setLoading] = useState(true);
    const { auth } = useAuth();
    const refresh = useRefreshToken();


    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
              await refresh();
             console.log('ahoj')
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
        console.log(`new token : ${JSON.stringify(auth?.token)}`)

    }, [isLoading])

    return (
        <>
            {isLoading
                ?<Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
                : <Outlet />}
        </>
    )

}

export default PersistLogin;