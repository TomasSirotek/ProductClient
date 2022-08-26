import React from "react";
import { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import axios from '../../api/axios.js';
import { DataGrid } from '@mui/x-data-grid';
import useRefreshToken from "../../hooks/useRefreshToken";
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


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
    { field: 'id', headerName: 'ID', width: 300 },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
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
      type: 'boolean',
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 230,
      type: 'dateTime',
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
       // console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        // navigate('/', { state: { from: location }, replace: true });
      } finally {
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
          ? <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
          :
      <div className="min-h-full">
        <header className="pb-3">
          <div className="max-w-7xl mx-auto flex py-4 px-1  justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/addUser')}>
              Add
            </Button>
          </div>
        </header>
        
        <div>
                    <Button onClick={() => refresh()}>Refresh </Button>
              </div>
      
          <Paper elevation={8} >
            {users?.length ? (
              <div style={{ height: 400, width: '100%' }} >
                <DataGrid
                  rows={users}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  loading={users ? false : true}
                  onRowClick={handleRowClick} {...users}
                />
              </div>
              
            ) : (
              <p>No users available !</p>
            )}
          </Paper>
      </div>
        }

    </>

  );
};

export default Users;
