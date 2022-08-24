import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { Grid, Paper, Button, TextField } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";

const AddUser = () => {
  const [user, setUser] = useState([]);
  const [checked, setChecked] = React.useState(true);
  const navigate = useNavigate();
  const [currency, setCurrency] = React.useState('EUR');
  const [personName, setRole] = React.useState([]);
  const initialValues = {
    email: "email",
    password: "password",
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrency(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const names = ["User", "Admin"];
  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
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
  return (
    <div className="min-h-full">
      <header className="pb-3">
        <div className="max-w-7xl mx-auto flex py-4 px-1  justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Add User</h1>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/users")}
          >
            Go back
          </Button>
        </div>
      </header>

      <div>
        <div className="max-w-md w-full">
          <Paper elevation={12}>
            {/* space for form */}
            <Box
      component="form"
      noValidate
      autoComplete="yes"
    >
            <div class="grid grid-flow-col flex flex-row grid-rows-2 grid-cols-2 gap-2 py-12">
              <div>
              <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="First name"
        />
              </div>
              <div>
              <TextField
          required
          id="outlined-required"
          label="Last name"
          defaultValue="Last name"
        />
              </div>
              <div>
              <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue="Email"
        />
              </div>
              <div>
              <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
              </div>
              <button
                                            type="submit"
                                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                                            Sign in
                                        </button>
            </div>
            </Box>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default AddUser;

{
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
