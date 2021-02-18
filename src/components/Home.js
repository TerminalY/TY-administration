import React from 'react'
import faker from 'faker'
const Home = () => {
    return (
        <div className="container">
            <h4 className="center">Home</h4>
            <p>This program intended for manage Terminal Y store.<br/>
                You can see daily graph of Financial gains.<br/>
                You can also manage your store, add new item and delete exist item, also you can edit stock of exist item.<br/>
                You can in the users tag to manage users in the program and delete users.
            </p>
            <img height='400px' src={process.env.PUBLIC_URL +"/teminaly.png"}/>
        </div>
    )
}

export default Home
