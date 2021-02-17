// import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
// import React from 'react';
// import { Table } from 'reactstrap';
// import Actions from './Actions';

// const TableInventory = (props) => {
//   return (
//     <Table>
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>Name</th>
//           <th>Count</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th scope="row">1</th>
//           <td>Mark</td>
//           <td>Otto</td>
//           <td>
//               <Actions color='success' icon={faPlus} iconColor='white'/>
//               <Actions color='warning' icon={faEdit} iconColor='white'/>
//               <Actions color='danger' icon={faTrash} iconColor='white'/>
//           </td>
//         </tr>
//         <tr>
//           <th scope="row">2</th>
//           <td>Jacob</td>
//           <td>Thornton</td>
//           <td>
//               <Actions color='success' icon={faPlus} iconColor='white'/>
//               <Actions color='warning' icon={faEdit} iconColor='white'/>
//               <Actions color='danger' icon={faTrash} iconColor='white'/>
//           </td>
//         </tr>
//         <tr>
//           <th scope="row">3</th>
//           <td>Larry</td>
//           <td>the Bird</td>
//           <td>
//               <Actions color='success' icon={faPlus} iconColor='white'/>
//               <Actions color='warning' icon={faEdit} iconColor='white'/>
//               <Actions color='danger' icon={faTrash} iconColor='white'/>
//           </td>
//         </tr>
//       </tbody>
//     </Table>
//   );
// }

// export default TableInventory;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';

export default function DataTable() {
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
  fetch(`http://localhost:3000/clothes/admin?name=${name}&pageSize=${rowsPerPage}&pageNum=${page}`)
  .then(res => res.json())
  .then(
    (result) => {
      setIsLoaded(true);
      setrows(result.clothes);
      setcount(result.count);
      console.log(name);
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

const handleChangeRowsPerPage = (e) => {
  setRowsPerPage(e.target.value);
}

const handleChangePage = (event) => {
  console.log(event);
  setPage(page + 1);

}

const onClickRow = (row) => {
  console.log(row);

  
}

const deleteItem = (row) => {
  console.log(row._id);
  return fetch('http://localhost:3000/clothes/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({id: row._id})
  }).then(
    (result) => {
      console.log(row)
      if (result) {
        
        setIsLoaded(true);
        // rows.splice(rows.findIndex(item => item._id === row._id), 1);
        // setrows(rows);
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
  console.log(event.target.value);
  setPage(0);
  setRowsPerPage(5);
  fetch(`http://localhost:3000/clothes/admin?name=${event.target.value}&pageSize=${rowsPerPage}&pageNum=${page}`)
  .then(res => res.json())
  .then(
    (result) => {
      setrows(result.clothes);
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

const updateStock =(row, e) => {

    return fetch('http://localhost:3000/clothes/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id: row._id, amount: e.target.value})
    }).then(
      (result) => {
        console.log(row)
        if (result) {
          
          setIsLoaded(true);
          // rows.splice(rows.findIndex(item => item._id === row._id), 1);
          // setrows(rows);
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


  return (
    <>
    <TextField id="standard-basic" label="Search..." onChange={handleSearch} />

    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="right">name</TableCell>
          <TableCell align="right">type</TableCell>
          <TableCell align="right">price</TableCell>
          <TableCell align="right">company</TableCell>
          <TableCell align="right">img</TableCell>
          <TableCell align="right">gender</TableCell>
          <TableCell align="right">color</TableCell>
            <TableCell align="right">size</TableCell>
            <TableCell align="right">stock</TableCell>
            <TableCell align="right">action</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row._id} onClick={() => onClickRow(row)}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.type}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right">{row.company}</TableCell>
            <TableCell align="right"> <img 
      src={row.img} height='100px' width='100px'
      alt="new"
      /></TableCell>
            <TableCell align="right">{row.gender}</TableCell>
            <TableCell align="right">
            <svg height="37" width="30">                 
              <circle cx="15" cy="25" r="10" stroke="grey" strokeWidth="1" fill={row.color} />
             </svg>
            </TableCell>
            <TableCell align="right">{row.size}</TableCell>
            <TableCell align="right"><TextField width='20px' required id="standard-basic" defaultValue={row.stock} label="Stock" onChange={(e) => updateStock(row, e)}/></TableCell>

            <TableCell align="right"><button onClick={()=> deleteItem(row)}><DeleteIcon /></button></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={10}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}

            />
          </TableRow>
        </TableFooter>
    </Table>
  </TableContainer>
  </>
  );
}