import React from "react";
import { useState,useEffect } from "react";
import DefaultTable from "../components/DefaultTable";
import { Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import axios from '../api/axios.js';
import { DataGrid } from '@mui/x-data-grid';
import useRefreshToken from "../hooks/useRefreshToken";




const USER_URL = '/User';  
const Employees = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // test 
  const refresh = useRefreshToken();

  const columns = [
    { field: 'id', headerName: 'ID', width: 300},
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'roles',
      headerName: 'Roles',
      width: 200,
      valueGetter: (params) =>
      `${params.row.roles.map(x => x.name) || 'No roles'}`,
    },
    {
      field: 'isActivated',
      headerName: 'Active',
      width: 100,
      type:'boolean',
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 250,
      type:'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
    },
   
  ];


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.get(USER_URL, {
                signal: controller.signal
            });
            console.log(response.data);
            isMounted && setUsers(response.data);
        } catch (err) {
            console.error(err);
         //   navigate('/', { state: { from: location }, replace: true });
        }
    }

    getUsers();

    return () => {
        isMounted = false;
        controller.abort();
    }
}, [])

  return (
    <div>
      <h2>Users page</h2>
      <Link to="/">Back home</Link>
      <Grid>
        <Paper elevation={12} className="paperStyle3">
          {users?.length ? (
           <div style={{ height: 500, width: '100%' }}>
           <DataGrid
             rows={users}
             columns={columns}
             pageSize={5}
             rowsPerPageOptions={[5]}
           />
         </div>
          ) : (
            <p>No users available !</p>
          )}
          <button onClick={() => refresh()}>Refresh</button>
        </Paper>
      </Grid>
    </div>
  );
};

export default Employees;
