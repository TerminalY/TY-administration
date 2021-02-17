import React from 'react'
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Terminal Y</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="nav nav-tabs">
                    <NavLink className="nav-item nav-link" exact to="/">Home</NavLink>
                    <NavLink className="nav-item nav-link" to="/inventory">Inventory</NavLink>
                    <NavLink className="nav-item nav-link" to="/orders">Orders</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
