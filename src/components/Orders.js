import React from 'react';
import BarChart from './BarChart';
import { useState, useEffect } from 'react'



// const data = [
//     {year: 1980, sales: 8949000},
//     {year: 1985,  sales: 10979000},
//     {year: 1990,  sales: 9303000},
//     {year: 1991,  sales: 8185000},
//     {year: 1992,  sales: 8213000},
//     {year: 1993,  sales: 8518000},
//     {year: 1994,  sales: 8991000},
//     {year: 1995,  sales: 8620000},
//     {year: 1996,  sales: 8479000},
//     {year: 1997,  sales: 8217000},
//     {year: 1998,  sales: 8085000},
//     {year: 1999,  sales: 8638000},
//     {year: 2000,  sales: 8778000},
//     {year: 2001,  sales: 8352000},
//     {year: 2002,  sales: 8042000},
//     {year: 2003,  sales: 7556000},
//     {year: 2004,  sales: 7483000},
//     {year: 2005,  sales: 7660000},
//     {year: 2006,  sales: 7762000},
//     {year: 2007,  sales: 7562000},
//     {year: 2008,  sales: 6769000},
//     {year: 2009,  sales: 5402000},
//     {year: 2010,  sales: 5636000},
//     {year: 2011,  sales: 6093000},
//     {year: 2012,  sales: 7245000},
//     {year: 2013,  sales: 7586000},
//     {year: 2014,  sales: 7708000},
//     {year: 2015,  sales: 7517000},
//     {year: 2016,  sales: 6873000},
//     {year: 2017,  sales: 6081000},
//   ]

  
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
