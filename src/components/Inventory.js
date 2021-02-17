import React from 'react';
import TableInventory from './Table';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
const Inventory = () => {
    const [open, setOpen] = React.useState(false);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
  
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  
    return (
        <div className="container">  
            <h4 className="center">Inventory</h4>

            <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{"margin-left": "1000px"}}>
        Add new Item
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">           Add new item 
</DialogTitle>
        <DialogContent>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
            <TableInventory/>
        </div>
    )
}

export default Inventory
