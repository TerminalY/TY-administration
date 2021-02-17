import React from 'react';
import BarChart from './BarChart';
import { useState, useEffect } from 'react'

const Orders = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setdata] = useState([]);
    useEffect(() => {
    fetch("http://localhost:3000/orders")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setdata(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
}, [])
    return (
        <div className="container">
            <h2>Financial gains</h2>
           <BarChart data={data} />
        </div>
    )
}

export default Orders
