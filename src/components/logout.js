import React from "react";
import { Logout } from 'tabler-icons-react';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

const handlelogout=()=>{
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
}
const Logoutapp=()=>{
    return(

        <Logout onClick={handlelogout} ></Logout>
    )
}

export default Logoutapp;