import React, { useState } from 'react'
import { FaLock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './LoginForm.scss'
const LoginForm = () => {
    const[username,setUsername] = useState<string>();
    const[password,setPassword] = useState<string>();
    console.log("username:",username,"password:",password);

    const loginUser = async(e: React.SyntheticEvent<EventTarget>) =>{
        e.preventDefault();
        if (!username || !password) {
            console.error('Lütfen tüm alanları doldurun.');
            return;
          }
        try{

            const formData = {
                username:username,
                password:password
            }

            const response = await fetch("http://localhost:8080/api/authenticate",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify(formData)
            })
            if (response.ok) {
                const data = await response.json();
                window.location.href = 'http://localhost:3000/'
                console.log(data);
                const userToken =data.token;
                const userId = data.id;

                localStorage.setItem('userId',JSON.stringify(userId))
                localStorage.setItem('userToken',JSON.stringify(userToken))
             
            }
        }catch(error){
            console.error("Giriş Yapılırken hata:",error);
            
        }
    }
    
    return (
        <div className='login-form-container'>
            <h3 className='login-form-Logo' >PINSOFT RECIPE</h3>
            <form className='login-form'>
                <div className='login-form-element'>
                <FaUser className='login-form-icon' />
                    <input type="text" placeholder='Kullanıcı Adı' className='login-form-input' onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='login-form-element'>
                <FaLock  className='login-form-icon' />
                    <input type="password" placeholder='Şifre' className='login-form-input' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='login-form-input' id='login-form-submit' onClick={loginUser} >Giriş Yap</button>
            </form>
            <Link to={'/kayit-ol'} style={{color:"gray",marginTop:"10px",textDecoration:"underline"}}>Kayıt Ol</Link>
        </div>
    )
}

export default LoginForm
