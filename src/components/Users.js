import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
const Users = () => {
    const useStyles = makeStyles({
        table: {
          minWidth: 950,
        },
      });
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const [error, setError] = useState(null);
      const [isLoaded, setIsLoaded] = useState(false);
      const [open, setOpen] = React.useState(false);
      const [deletes, setdeletes] = React.useState(false);
      const [count, setcount] = React.useState(0);
      const [name, setname] = React.useState('');
      
    
      const [rows, setrows] = useState([]);
      useEffect(() => {
      fetch(`http://localhost:3000/users?name=${name}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setrows(result.users);
          setcount(result.count);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }, [page, rowsPerPage, deletes])
    const classes = useStyles();
    
    const deleteItem = (row) => {
        console.log(row)
      return fetch('http://localhost:3000/user/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: row._id})
      }).then(
        (result) => {
          if (result) {
            setIsLoaded(true);
            setdeletes(result);
          }
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }
    
    const handleSearch = (event) => {
      setPage(0);
      setRowsPerPage(5);
      fetch(`http://localhost:3000/users?name=${event.target.value}`)
      .then(res => res.json())
      .then(
        (result) => {
          setrows(result.users);
          setcount(result.count);
          if (event.target && event.target.value) {
            setname(event.target.value);
          } else {
            setname('');
          }
          
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    } 
     
    
      return (
        <>
        <TextField id="standard-basic" label="Search..." onChange={handleSearch} />
    
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">user</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">password</TableCell>
              <TableCell align="right">action</TableCell>    
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.password}</TableCell>
              
                <TableCell align="right"><button onClick={()=> deleteItem(row)}><DeleteIcon /></button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
      );
}

export default Users