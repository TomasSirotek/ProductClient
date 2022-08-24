import React from "react";
import { useState, useEffect } from "react";
import { Grid, Paper, Button, TextField,Snackbar,Alert } from "@mui/material";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import useRefreshToken from "../../../hooks/useRefreshToken";
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Field, Form, Formik } from "formik";
import { useTheme } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import axios from '../../../api/axios';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const EditUser = () => {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [checked, setChecked] = React.useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [firstName, setFirstName] =useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([]);
    const [personName, setRole] = React.useState([]);
    const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const from = location.state?.from?.pathname || "/users";

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
    firstName: 'firstName',
   
};

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

       const roleType = [
    "Administrator",
    "User"
  ]


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setRoles(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const names = [
        'User',
        'Admin'

      ];

      const handleClose = () => {
        setOpen(false);
    }

    const deleteUser = async () => {
        try {
            const response = await axios.delete(`/User/${id}`)
               
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
    

    //test 
    const refresh = useRefreshToken();

    let { id } = useParams();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async () => {
            try {
                const response = await axiosPrivate.get(`/User/${id}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUser(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }

        }

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


 


    return (
        <>
            {isLoading
                ? <p>Loading current user</p>
                : <div>
                   
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {errMsg}
                        </Alert>
                    </Snackbar>
      <header className="pb-3">
        <div className="max-w-7xl mx-auto flex py-4  justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>

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
            Edit basic information
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
             // onSubmit={createUser}
        
            >
              <Form action="#" method="POST">
                <div className="grid gap-4 grid-cols-2 grid-rows-1 px-5 py-5 align-center">
                  <TextField
                    required
                   
                    id="outlined-required"
                    name="firstName"
                    value={user.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    required
                    name="lastName"
                   
                    id="outlined-required"
                    value={user.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                  name="email"
                    required
                    type="email"
                    value={user.email}
                    id="outlined-required"
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                  name="password"
                    required
                    value={user.passwordHash}
                    margin="normal"
                    type="password"
                    disabled
                    id="outlined-disabled"
                  />

                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Roles
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-multiple-name"
                      multiple
                      value={roleType}
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
                    onChange={handleChangeCheck}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size = "large"
        
                    startIcon={<AddIcon />}
                    
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    size = "large"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => deleteUser()}
                  >
                    Delete
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
                    


                }
        </>

    );
};

export default EditUser;


{/* <Box
component="form"
sx={{
    '& .MuiTextField-root': { m: 1, width: '25ch' },
}}
noValidate
autoComplete="off"
>
<Grid container spacing={1}>
    <Grid item xs={12} md={6}>
        <Paper elevation={12} className="paperStyle4">

            <Grid xs={2} sm={4} md={12} pt={3} >
                <TextField
                    required
                    id="outlined-required"
                    
                    value={user.firstName}
                />
                <TextField
                    required
                    id="outlined-required"
                   
                    value={user.lastName}
                    margin="normal"
                />
                <TextField
                    required
                    id="outlined-required"
                    
                    value={user.email}

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
                        onChange={handleChange}
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
    <Grid item xs={12} md={6}>
        <Paper elevation={12} className="paperStyle4">
            <Grid xs={2} sm={4} md={12} pt={3} >
                <TextField
                    id="outlined-read-only-input"
                

                    value={user.firstName}
                    InputProps={{
                        readOnly: true,
                    }}

                />
                <TextField
                    id="outlined-read-only-input"
                   
                    value={user.lastName}
                    InputProps={{
                        readOnly: true,
                    }}
                    margin="normal"
                />
                <TextField
                    id="outlined-read-only-input"
                   
                    value={user.email}
                    InputProps={{
                        readOnly: true,
                    }}
                    margin="normal"
                />
                <TextField
                    id="standard-disabled"
                    

                    InputProps={{
                        readOnly: true,
                    }}
                    margin="normal"
                />
                <TextField
                    id="outlined-read-only-input"
                    
                    value={user.isActivated ? '✅' : '❌'}
                    InputProps={{
                        readOnly: true,
                    }}
                    margin="normal"
                />
                <TextField
                    id="outlined-read-only-input"
                   
                    value={user.createdAt}
                    InputProps={{
                        readOnly: true,
                    }}
                    margin="normal"
                />
                
                <TextField
                    id="outlined-read-only-input"
                    
                    value={user.updatedAt ? 'yet not updated' : user.updatedAt}
                    InputProps={{
                        readOnly: true,
                    }}
                    margin="normal"
                />

            </Grid>
        </Paper>
    </Grid>
</Grid>

</Box> */}