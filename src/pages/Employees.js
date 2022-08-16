import React from 'react'
import Table from '../components/Table'
import {Alert, Avatar, Button, Grid, Paper, Snackbar, TextField} from "@mui/material";

function Employees() {
  const newRows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),

  ];
  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }
  return (
    <div>
      <h2>Employess page</h2>
  
      <Grid >
                        <Paper elevation={12}  className="paperStyle3">
  <Table
   Rows={newRows}
  />
                 
                        </Paper>
                    </Grid>
 
    </div>
  )
}

export default Employees