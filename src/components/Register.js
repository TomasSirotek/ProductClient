import {useRef,useState,useEffect} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios.js';
import {Alert, Avatar, Button, Grid, Paper, Snackbar, Stack, TextField} from "@mui/material";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
const REGISTER_URL = '/Auth/register';

const Register = () => {
    // hooks
    const userRef = useRef();
    // states 
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    
    const [email,setEmail] = useState('');
    const [validEmail,setValidEmail] = useState(false);
    
    const [password,setPwd] = useState('');
    const [validPwd,setValidPwd] = useState(false);
    
    const [matchPwd,setMatchPwd] = useState('');
    const [validMatch,setValidMatch] = useState(false);
    
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
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPwd(result);
        const match = password === matchPwd;
        setValidMatch(match);

    },[password,matchPwd])

    useEffect(() => {
        setErrMsg('');
    },[firstName,lastName,email,password,matchPwd])

    const handleClose = () => {
        setOpen(false);

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
         const v1 = EMAIL_REGEX.test(email);
         const v2 = PWD_REGEX.test(password);
         if (!v1 || !v2 ) {
             setErrMsg("Invalid Entry");
             return;
         }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ firstName,lastName,email,password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false 
                }
            );
            console.log(response?.data);
            console.log(response?.data?.token);
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setFirstName('');
            setLastName('');
            setEmail('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                setOpen(true);
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
                setOpen(true);
                // Dont need at all
            } else {
                setErrMsg('Registration Failed')
                setOpen(true);
            }
        }
    }
    
    const usernameTexFieldStyle =
        {
            marginBottom: "10px"
        };
    const passwordTexFieldStyle =
        {
            marginBottom: "50px"
        };
    
    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                
                <div className="main">
                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                {errMsg}
                            </Alert>
                        </Snackbar>
                    <Grid >
                        <Paper elevation={12}  className="paperStyle" xs={12}>
                            <Grid align='center'>
                                <Avatar src="/broken-image.jpg" />
                                <h2>Register</h2>
                            </Grid>

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    id="setFirstName"
                                    label="First name"
                                    variant="standard"
                                    placeholder="Enter first name"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    aria-describedby="uidnote"
                                    style={usernameTexFieldStyle}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    id="setLastName"
                                    label="Last name"
                                    variant="standard"
                                    placeholder="Enter last name"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    aria-describedby="uidnote"
                                    style={usernameTexFieldStyle}
                                    fullWidth
                                    required
                                    
                                />
                                <TextField
                                    id="setEmail"
                                    label="Email"
                                    variant="standard"
                                    placeholder="Enter email"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    style={usernameTexFieldStyle}
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
                                style={usernameTexFieldStyle}
                                fullWidth
                                required
                            />
                                <TextField
                                    id="confirm_pwd"
                                    type="password"
                                    label="Repeat Password"
                                    variant="standard"
                                    placeholder="Enter email"
                                    autoComplete="off"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    style={passwordTexFieldStyle}
                                    fullWidth
                                    required
                                />
                                <Button type='submit' color='primary' variant="contained"  fullWidth disabled={!validPwd || !validMatch || !validEmail}>
                                    Sign in
                                </Button>
                            </form>
                            <p className="beforeLine">
                                Already registered?<br />
                                <span className="line">
                            {/*put router link here*/}
                                    <a href="#">Sign In</a>
                        </span>
                            </p>
                        </Paper>
                    </Grid>
         
                        {/*    First Name:*/}
                        {/*    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />*/}
                        {/*    <FontAwesomeIcon icon={faTimes} className={validName || !setFirstName ? "hide" : "invalid"} />*/}
                        {/*</label>*/}
                        {/* lets  see */}
                        {/*<p id="uidnote" className={userFocus && setFirstName && !validName ? "instructions" : "offscreen"}>*/}
                        {/*    <FontAwesomeIcon icon={faInfoCircle} />*/}
                        {/*    4 to 24 characters.<br />*/}
                        {/*    Must begin with a letter.<br />*/}
                        {/*    Letters, numbers, underscores, hyphens allowed.*/}
                        {/*</p>*/}
                    
                        {/*<label htmlFor="lastName">*/}
                        {/*    Last Name:*/}
                        {/*    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />*/}
                        {/*    <FontAwesomeIcon icon={faTimes} className={validName || !setFirstName ? "hide" : "invalid"} />*/}
                        {/*</label>*/}
                    
                   
                        
                        {/*<label htmlFor="email">*/}
                        {/*    Email:*/}
                        {/*    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />*/}
                        {/*    <FontAwesomeIcon icon={faTimes} className={validName || !setLastName ? "hide" : "invalid"} />*/}
                        {/*</label>*/}
                    
                        {/*<label htmlFor="password">*/}
                        {/*    Password:*/}
                        {/*    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />*/}
                        {/*    <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />*/}
                        {/*</label>*/}
                        
                        {/*<input*/}
                        {/*    type="password"*/}
                        {/*    id="password"*/}
                        {/*    onChange={(e) => setPwd(e.target.value)}*/}
                        {/*    value={password}*/}
                        {/*    required*/}
                        {/*    aria-invalid={validPwd ? "false" : "true"}*/}
                        {/*    aria-describedby="pwdnote"*/}
                        {/*   // onFocus={() => setPwdFocus(true)}*/}
                        {/*   // onBlur={() => setPwdFocus(false)}*/}
                        {/*/>*/}
                        {/*<p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>*/}
                        {/*    <FontAwesomeIcon icon={faInfoCircle} />*/}
                        {/*    8 to 24 characters.<br />*/}
                        {/*    Must include uppercase and lowercase letters, a number and a special character.<br />*/}
                        {/*    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>*/}
                        {/*</p>*/}
                        
                    
                    {/*    <label htmlFor="confirm_pwd">*/}
                    {/*        Confirm Password:*/}
                    {/*        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />*/}
                    {/*        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />*/}
                    {/*    </label>*/}
                   
                    {/*    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>*/}
                    {/*        <FontAwesomeIcon icon={faInfoCircle} />*/}
                    {/*        Must match the first password input field.*/}
                    {/*    </p>*/}
                    
                    {/*    <button >Sign Up</button>*/}
                    {/*    /!*<button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>*!/*/}
                    {/*</form>*/}
                    {/*<p>*/}
                    {/*    Already registered?<br />*/}
                    {/*    <span className="line">*/}
                    {/*        /!*put router link here*!/*/}
                    {/*        <a href="#">Sign In</a>*/}
                    {/*    </span>*/}
                    {/*</p>*/}
                </div>
                
                
            )}
        </>
    )
}

export default Register