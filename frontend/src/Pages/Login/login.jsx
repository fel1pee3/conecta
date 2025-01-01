import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import style from "./Login.module.css"
import img from "../../../images/logo-conecta-semfundo.png"

const Login = () => {

    const [values, setVAlues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChanges = (e) => {
    setVAlues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('http://localhost:3000/auth/login', values)
        if(response.status === 201){
        localStorage.setItem('token', response.data.token)
        navigate('/')
        }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className={style.login}>
            <div className={style.loginContainer}>
                <form onSubmit={handleSubmit} className={style.loginForm}>
                    <div className={style.caixaLogo}>
                        <img className={style.imgLogo} src={img} alt="Logo" />
                    </div>
                    <div className={style.caixaInput}>
                        <input className={style.loginInput} type="email" placeholder='Email'  name='email' autoComplete="username" onChange={handleChanges}/>
                    </div>
                    <div className={style.caixaInput}>
                        <input className={style.loginInput} type="password" placeholder='Senha'  name='password' autoComplete="current-password" onChange={handleChanges}/>
                    </div>
                    <button className={style.btnCad}>Login</button>
                    </form>
                <div className={style.loginRegister}>
                    <p>Não tem conta?</p>
                    <Link to='/Register'>Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login