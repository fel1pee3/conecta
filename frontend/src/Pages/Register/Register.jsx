import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import style from "./Register.module.css"
import img from "../../../images/logo-conecta-semfundo.png"
import { RxEyeOpen } from "react-icons/rx";
import { LuEyeClosed } from "react-icons/lu";

const Register = () => {

    const [values, setVAlues] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    
    const navigate = useNavigate()
    
    const handleChanges = (e) => {
        setVAlues({...values, [e.target.name]:e.target.value})
    }
    
    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('http://localhost:3000/auth/register', values)
        if(response.status === 201){
        navigate('/login')
        }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className={style.register}>
            <div className={style.registerContainer}>
                <form onSubmit={handleSubmit} className={style.registerForm}>
                    <div className={style.caixaLogo}>
                        <img className={style.imgLogo} src={img} alt="Logo" />
                    </div>
                    <div className={style.caixaInput}>
                        <input className={style.registerInput} type="email" placeholder='Email' name='email' autoComplete="username" onChange={handleChanges}/>
                    </div>
                    <div className={style.caixaInput}>
                        <input className={style.registerInput} type={showPassword ? "text" : "password"} placeholder='Senha' name='password' autoComplete="new-password" onChange={handleChanges}/>
                        <button className={style.btnEye} type="button" onClick={togglePasswordVisibility}>
                            {showPassword ? <LuEyeClosed /> : <RxEyeOpen />}
                        </button>
                    </div>
                    <div className={style.caixaInput}>
                        <input className={style.registerInput} type="text" placeholder='Nome de usuário' name='username' onChange={handleChanges}/>
                    </div>
                    <button className={style.btnCad}>Cadastrar</button>
                </form>
                <div className={style.registerLogin}>
                    <p>Já tem conta?</p>
                    <Link to='/Login'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register