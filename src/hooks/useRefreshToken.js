import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { auth } = useAuth();

    const token = auth?.token;
    // console.log("look here => " + token);
    const refreshToken = auth?.refreshToken;
//     // console.log(refreshToken)
 const roles = auth?.roles;
console.log("refresh roles state " + roles);
    const refresh = async () => {
        const response = await axios.post('/Auth/refresh-token',
        JSON.stringify({ token,refreshToken}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: false
        }
    );
        setAuth(prev => {
            console.log("previous" + JSON.stringify(prev));
            console.log(response.data);
            console.log("response refresh roles" + response.data.roles)
            return { ...prev,
                roles: roles,
                token: response.data}
        });
        return response.data;
    }
    return refresh;
};

export default useRefreshToken;