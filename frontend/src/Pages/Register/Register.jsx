import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./Register.css"

const Register = () => {

    const [values, setVAlues] = useState({
        username: '',
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
        const response = await axios.post('http://localhost:3000/auth/register', values)
        if(response.status === 201){
        navigate('/login')
        }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Seu nome</label>
                    <input type="text" placeholder='Nome Sobrenome'  name='username' onChange={handleChanges}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='email@gmail.com'  name='email' autoComplete="username" onChange={handleChanges}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='senha@12345'  name='password' autoComplete="new-password" onChange={handleChanges}/>
                </div>
                <button>Cadastrar</button>
            </form>
            <div>
                <p>Already Have Account?</p>
                <Link to='/Login'>Login</Link>
            </div>
        </div>
    )
}

export default Register