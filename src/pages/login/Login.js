import { useState, useEffect, useContext } from "react";
import axios from '../../api/axios.js';
import { Alert, Avatar, Button, Grid, Paper, Snackbar, TextField } from "@mui/material";
import AuthContext from "../../context/AuthProvider";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from "formik";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const AUTH_URL = '/Auth';

const Login = () => {
    // hooks
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth } = useContext(AuthContext);
    // states 
   //  const [user,setUser] = useState()
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Snack bar 
    const [open, setOpen] = useState(false);

    const initialValues = {
        email: email,
        password: password,
    };

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])


    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async () => {

        // if button enabled with JS hack
        try {
            const response = await axios.post(AUTH_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            const token = response?.data?.token;
            const refreshToken = response?.data?.refreshToken;
            
            const roles = response?.data?.roles.map(x => x.name);
           // console.log('User is in roles  =>' + roles)
            setAuth({ email, password, roles, token,refreshToken })
            console.log("here are roles " + roles)
            console.log(response?.data);
            console.log('This is jwt token=> ' + token);
            console.log('This is refresh token=> ' + refreshToken);

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
                    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                    Sign in to your account
                                </h2>
                            </div>
                            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                <Form className="mt-8 space-y-6" action="#" method="POST">
                                    <input type="hidden" name="remember" defaultValue="true" />
                                    <div className="rounded-md shadow-sm -space-y-px">
                                        <div>
                                            <label htmlFor="email-address" className="sr-only">
                                                Email address
                                            </label>
                                            <Field
                                                id="email-address"
                                                name="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                autoComplete="email"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Email address"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="sr-only">
                                                Password
                                            </label>
                                            <Field
                                                id="password"
                                                name="password"
                                                type="password"
                                                onChange={(e) => setPwd(e.target.value)}
                                                value={password}
                                                autoComplete="current-password"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Password"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Field
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label
                                                htmlFor="remember-me"
                                                className="ml-2 block text-sm text-gray-900"
                                            >
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm">
                                            <a
                                                href="#"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                                            Sign in
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>

                </div>


            )}
        </>
    )
}

export default Login
