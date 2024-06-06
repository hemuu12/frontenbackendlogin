import React, { useState } from 'react';
import withAuth from '../HOCAuth/AuthWrapper';


const Home = () => {
const [userdetail , setUserDetail] =useState(JSON.parse(localStorage.getItem("user"))||{})

    return (
        <>
            <h1>Home Page</h1>
            <p>{`Welcome ${userdetail?.email} Home Page of Our Website.`}</p>
        </>
    )
}

export default withAuth(Home)
