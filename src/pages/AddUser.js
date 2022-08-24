import { Link, useNavigate ,useLocation} from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { Grid, Paper, Button, TextField ,Snackbar,Alert} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from '../api/axios';
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const POST_USER = '/User';

const AddUser = () => {
    const location = useLocation();
  const [firstName, setFirstName] =useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActivated, setChecked] =  useState(true);
  const [roles, setRoles] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  
  // Snack bar 
  const [open, setOpen] = useState(false);
  const roleType = [
    "Administrator",
    "User"
  ]
  const handleClose = () => {
    setOpen(false);
}
const from = location.state?.from?.pathname || "/users";

  const navigate = useNavigate();
 

  const theme = useTheme();

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };

  function getStyles(role, roles, theme) {
    return {
      fontWeight:
      roles.indexOf(role) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRoles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    setErrMsg('');
}, [email, password]) // add more 

  const createUser = async () => {
    try {
        const response = await axios.post(POST_USER,
            JSON.stringify({ firstName, lastName,email,roles,password,isActivated}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            }
        );
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
            setErrMsg('Creation failed')
            setOpen(true);
        }
    }

  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  const initialValues = {
    firstName: firstName,
    lastName: lastName,
    email:email,
    isActive:isActivated,
    roles:roles,
    password:password
};

  return (
    <div>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {errMsg}
                        </Alert>
                    </Snackbar>
      <header className="pb-3">
        <div className="max-w-7xl mx-auto flex py-4  justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Add User</h1>

          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/users")}
          >
            Go back
          </Button>
        </div>
        <div className="max-w-7xl mx-auto flex  flex-start">
          <h2 className="text-1xl font-bold text-gray-700">
            Basic information
          </h2>
        </div>
      </header>
      <div className="grid gap-4 grid-cols-2 grid-rows-1 pt-5  ">
        <div className="w-full space-y-8">
          <Paper elevation={12}>
            <Formik
            initialValues={initialValues}
            
            //   validationSchema={Yup.object({
            //     firstName: Yup.string()
            //       .max(5, "Must be 15 characters or less")
            //       .required("Required"),
            //     lastName: Yup.string()
            //       .max(5, "Must be 20 characters or less")
            //       .required("Required"),
            //     email: Yup.string()
            //       .email("Invalid email addresss`")
            //       .required("Required"),
         
            //       password: Yup.string()
            //       .required("Required"),
            //   })}
              onSubmit={createUser}
        
            >
              <Form action="#" method="POST">
                <div className="grid gap-4 grid-cols-2 grid-rows-1 px-5 py-5 align-center">
                  <TextField
                    required
                    label={"First name"}
                    id="outlined-required"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    required
                    name="lastName"
                    label={"Last name"}
                    id="outlined-required"
                    onChange={(e) => setLastName(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                  name="email"
                    label={"Email"}
                    required
                    type="email"
                    id="outlined-required"
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                  name="password"
                    label={"Password"}
                    required
                    id="outlined-required"
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    type="password"
                  />

                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Roles
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-multiple-name"
                      multiple
                      value={roles}
                      onChange={handleChange}
                      input={<OutlinedInput label="Role" />}
                      MenuProps={MenuProps}
                    >
                      {roleType.map((role) => (
                        <MenuItem
                          key={role}
                          value={role}
                          style={getStyles(role, roles, theme)}
                        >
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    value="start"
                    control={<Checkbox />}
                    label="User active"
                    labelPlacement="end"
                    onChange={handleChangeCheck}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size = "large"
                    startIcon={<AddIcon />}
                    
                  >
                    Add
                  </Button>
                  
                </div>
              </Form>
            </Formik>
          </Paper>
        </div>
        <div className=" w-full space-y-8">
          {/* <Paper elevation={12}>Address fields </Paper> */}
        </div>
      </div>
    </div>
  );
};

export default AddUser;

{
  // <div className="min-h-full">
  //   <header className="pb-3">
  //     <div className="max-w-7xl mx-auto flex py-4 px-1  justify-between">
  //       <h1 className="text-3xl font-bold text-gray-900">Add User</h1>
  //       <Button
  //         variant="contained"
  //         startIcon={<AddIcon />}
  //         onClick={() => navigate("/users")}
  //       >
  //         Go back
  //       </Button>
  //     </div>
  //   </header>
  //   <div>
  //     <div className="max-w-md w-full">
  //       <Paper elevation={12}>
  //         {/* space for form */}
  //         <Box
  //   component="form"
  //   noValidate
  //   autoComplete="yes"
  // >
  //         <div class="grid grid-flow-col flex flex-row grid-rows-2 grid-cols-2 gap-2 py-12">
  //           <div>
  //           <TextField
  //       required
  //       id="outlined-required"
  //       label="Required"
  //       defaultValue="First name"
  //     />
  //           </div>
  //           <div>
  //           <TextField
  //       required
  //       id="outlined-required"
  //       label="Last name"
  //       defaultValue="Last name"
  //     />
  //           </div>
  //           <div>
  //           <TextField
  //       required
  //       id="outlined-required"
  //       label="Email"
  //       defaultValue="Email"
  //     />
  //           </div>
  //           <div>
  //           <TextField
  //       id="outlined-select-currency"
  //       select
  //       label="Select"
  //       value={currency}
  //       onChange={handleChange}
  //       helperText="Please select your currency"
  //     >
  //       {currencies.map((option) => (
  //         <MenuItem key={option.value} value={option.value}>
  //           {option.label}
  //         </MenuItem>
  //       ))}
  //     </TextField>
  //           </div>
  //           <button
  //                                         type="submit"
  //                                         className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //                                     >
  //                                         <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
  //                                         Sign in
  //                                     </button>
  //         </div>
  //         </Box>
  //       </Paper>
  //     </div>
  //   </div>
  // </div>
  /* <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
    >
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                <Paper elevation={12} >

                    <Grid xs={2} sm={4} md={12} pt={3} >
                        <TextField
                            required
                            id="outlined-required"
                            
                        />
                        <TextField
                            required
                            id="outlined-required"
                           
                         
                            margin="normal"
                        />
                        <TextField
                            required
                            id="outlined-required"
                         

                            margin="normal"
                        />
                        <FormControl sx={{ m: 1, width: 330 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
                            <Select
                                required
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={personName}
                                input={<OutlinedInput label="Roles" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 330 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Is Activated</InputLabel>
                            <Select
                                required
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Is Activated" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        
                        <Grid container spacing={0} mt={10}>
                            <Grid item xs={4} md={6}>
                                <Button variant="contained" endIcon={<SyncAltIcon />}>
                                    Update
                                </Button>
                            </Grid>
                            <Grid item xs={4} md={6}>
                                <Button variant="outlined" startIcon={<DeleteForeverIcon />}>
                                    Delete
                                </Button>
                            </Grid>

                        </Grid>



                    </Grid>

                </Paper>
            </Grid>
          
        </Grid>

    </Box> */
}
