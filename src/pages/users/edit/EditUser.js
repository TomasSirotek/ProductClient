import React from "react";
import { useState, useEffect } from "react";
import { Grid, Paper, Button, TextField } from "@mui/material";
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


const EditUser = () => {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [checked, setChecked] = React.useState(true);

  
    const [personName, setRole] = React.useState([]);
    const axiosPrivate = useAxiosPrivate();

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

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setRole(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const names = [
        'User',
        'Admin'

      ];

    

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
                    <Box
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

                    </Box>

                    


                </div>}
        </>

    );
};

export default EditUser;
