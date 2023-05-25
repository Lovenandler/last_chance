import React, { useEffect, useState } from "react";
import {auth,provider} from "./config";
import {signInWithPopup} from "firebase/auth";

function SignIn(){
    const [value,setValue] = useState('')
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email",data.user.email)
        })
    }
    
    
    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })
    const logout =()=>{
        localStorage.clear()
    }

return (
    <div className="google_div">
        <button className="sign_google_btn" onClick={handleClick}><span className="enter_google_title">Войти с помощью Google</span>
        <img className="google_icon" src="https://img.icons8.com/?size=512&id=17949&format=png"
                  alt="Google"></img>
        </button>
        <button className="google_exit" onClick={logout}><span className="exit_google_title">Выйти</span>
        <img className="exit_icon" src="https://img.icons8.com/?size=512&id=10809&format=png"
                  alt="Выйти из аккаунта"></img>
        </button>
        <input className="user_name_input" value={localStorage.getItem('email')}></input>
    </div>
);
}
export default SignIn;