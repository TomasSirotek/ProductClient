import { useState, useEffect, useContext} from "react";
import axios from '../../api/axios.js';
import {Alert, Avatar, Button, Grid, Paper, Snackbar, TextField} from "@mui/material";
import AuthContext from "../../context/AuthProvider";
import {Link, useLocation, useNavigate} from 'react-router-dom';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const AUTH_URL = '/Auth';

const Login = () => {
    // hooks
    const navigate = useNavigate();
    const location = useLocation();
    const {setAuth} = useContext(AuthContext);
    // states 

    const from = location.state?.from?.pathname || "/";
    
    const [email,setEmail] = useState('');
    const [validEmail,setValidEmail] = useState(false);
    
    const [password,setPwd] = useState('');
    const [validPwd,setValidPwd] = useState(false);
    
    const [errMsg,setErrMsg] = useState('');
    const [success,setSuccess] = useState(false);

    // Snack bar 
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    },[email])

    
    useEffect(() => {
        setErrMsg('');
    },[email,password])

    const handleClose = () => {
        setOpen(false);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        try {
            const response = await axios.post(AUTH_URL,
                JSON.stringify({email,password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false 
                }
            );
            const token = response?.data?.token;
            const roles = response?.data?.roles; 
            setAuth({email,password,roles,token})
            
            console.log(response?.data);
            console.log('This is jwt token=> ' + token);

            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setEmail('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                setOpen(true);
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid Email or Password');
                setOpen(true);
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
                setOpen(true);
                
            } else {
                setErrMsg('Login Failed')
                setOpen(true);
            }
        }
    }
    
    const emailTextFieldStyle =
        {
            marginBottom: "10px"
        };
    const passwordTextFieldStyle =
        {
            marginBottom: "50px"
        };
    
    return (
        <>
            {success ? (
                <section>
                    <h1>Welcome  </h1>
                    <p>
                        <a href="#">Home page</a>
                    </p>
                </section>
            ) : (
                
                <div className="main2">
                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                {errMsg}
                            </Alert>
                        </Snackbar>
                    <Grid >
                        <Paper elevation={12}  className="paperStyle2">
                            <Grid align='center'>
                                <Avatar src="/broken-image.jpg" />
                                <h2>Login</h2>
                            </Grid>

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="standard"
                                    placeholder="Enter email"
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    aria-describedby="uidnote"
                                    style={emailTextFieldStyle}
                                    fullWidth
                                    required
                                />
                                <TextField
                                id="password"
                                type="password"
                                label="Password"
                                variant="standard"
                                placeholder="Enter Password"
                                autoComplete="off"
                                onChange={(e) => setPwd(e.target.value)}
                                value={password}
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="uidnote"
                                style={passwordTextFieldStyle}
                                fullWidth
                                required
                            />
                                <Button type='submit' color='primary' variant="contained"  fullWidth disabled={!password || !validEmail}>
                                    Login
                                </Button>
                            </form>
                            <p className="beforeLine">
                                If you want <br />
                                <span className="line">
                            {/*put router link here*/}
                                    <Link to="/register">Sign Up</Link>
                        </span>
                            </p>
                        </Paper>
                    </Grid>
           
                </div>
                
                
            )}
        </>
    )
}

export default Login