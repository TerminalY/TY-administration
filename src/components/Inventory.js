import React from 'react';
import TableInventory from './Table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {useReducer, useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
const Inventory = () => {
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
   }
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [formData, setFormData] = useReducer(formReducer, {});

    const handleChange = event => {
      setFormData({
        name: event.target.name,
        value: event.target.value,
      });
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
     
      const handleSubmit = event => {
        console.log(formData);

        event.preventDefault();
        fetch("http://localhost:3000/clothes", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({color: formData.color,
            price: formData.price,
            size: formData.size,
            type: formData.type,
            subtype: formData.subType,
            stock: formData.stock,
            gender: formData.gender,
            image: formData.image,
            company: formData.company,
          desc: formData.name})
        })
        .then(res => res.json())
        .then(
          (result) => {

            setIsLoaded(true);
            setOpen(false);
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
        <div className="container">  
            <h4 className="center">Inventory</h4>

            <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{"marginLeft": "1000px"}}>
        Add new Item
      </Button>
      <Dialog fullWidth='true' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">           Add new item 
</DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit}>
        <fieldset >
          <label style={{"width": "100%"}}>
            <p>Name</p>
            <input style={{"width": "inherit"}} name="name" onChange={handleChange} required/>
          </label>
        </fieldset>
        <fieldset>
          <label style={{"width": "100%"}}>
            <p>Type</p>
            <input style={{"width": "inherit"}} name="type" onChange={handleChange}/>
          </label>
        </fieldset>
        <fieldset>
          <label style={{"width": "100%"}}>
            <p>subType</p>
            <input style={{"width": "inherit"}} name="subType" onChange={handleChange}/>
          </label>
        </fieldset>
        <fieldset>
          <label style={{"width": "100%"}}>
            <p>Price</p>
            <input style={{"width": "inherit"}} name="price" onChange={handleChange}/>
          </label>
        </fieldset>
        <fieldset>
          <label style={{"width": "100%"}}>
            <p>Company</p>
            <input style={{"width": "inherit"}} name="company" onChange={handleChange}/>
          </label>
        </fieldset>
        <fieldset>
          <label style={{"width": "100%"}}>
            <p>Image</p>
            <input style={{"width": "inherit"}} name="image" onChange={handleChange}/>
          </label>
        </fieldset>
        <fieldset>
          <label style={{"width": "100%"}}>
            <p>Gender</p>
            <input style={{"width": "inherit"}} name="gender" onChange={handleChange}/>
          </label>
        </fieldset>
        <fieldset>
          <label style={{"width": "100%"}}>
            <p>Color</p>
            <input style={{"width": "inherit"}} name="color" onChange={handleChange}/>
          </label>
        </fieldset>
        <fieldset>
          <label style={{"width": "100%"}}>
            <p>Size</p>
            <input style={{"width": "inherit"}} name="size" onChange={handleChange}/>
          </label>
        </fieldset>
        <fieldset>
          <label style={{"width": "100%"}}>
            <p>Stock</p>
            <input style={{"width": "inherit"}} name="stock" onChange={handleChange}/>
          </label>
        </fieldset>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type='submit' onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
        </DialogContent>
        
      </Dialog>
            <TableInventory/>
        </div>
    )
}

export default Inventory
