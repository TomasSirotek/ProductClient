import React from "react";
import { useState,useEffect } from "react";
import DefaultTable from "../../components/DefaultTable";
import { Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import axios from '../../api/axios.js';
import { DataGrid } from '@mui/x-data-grid';
import useRefreshToken from "../../hooks/useRefreshToken";
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';



const USER_URL = '/User';  
const Users = () => {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('');
  // test 
  const refresh = useRefreshToken();
  

  const handleRowClick = (params) => {
    const from = location.state?.from?.pathname || `/users/${params.row.id}`;
    navigate(from, { replace: true });

  };
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
       // navigate('/', { state: { from: location }, replace: true });
        } finally{
          setLoading(false);
        }
        
    }

    getUsers();

    return () => {
        isMounted = false;
        controller.abort();
    }
}, [])

  return (
    <>
    {isLoading
        ? <p>Loading users</p>
        :  <div>
        
        <h2>Users page</h2>
        
    
        <Grid>
          <Paper elevation={12} className="paperStyle3">
          {message && <Alert severity="info">{message}</Alert>}

            {users?.length ? (
             <div style={{ height: 500, width: '100%' }}>
             <DataGrid
               rows={users}
               columns={columns}
               pageSize={5}
               rowsPerPageOptions={[5]}
               onRowClick={handleRowClick} {...users}
             />
           </div>
            ) : (
              <p>No users available !</p>
            )}
            <button onClick={() => refresh()}>Refresh</button>
          </Paper>
        </Grid>
      </div>}
</>
   
  );
};

export default Users;
