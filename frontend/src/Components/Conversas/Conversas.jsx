import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './Conversas.module.css'
import Header from '../Header/Header'
import { FaMagnifyingGlass } from "react-icons/fa6";
import Contatos from '../Contatos/Contatos';

const Conversas = () => {

    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/auth/home', {
            headers: {
            "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 201) {
                setUserName(response.data.users.username); 
            } else {
                navigate('/login');
            }
        } catch (err) {
        navigate('/login');
        console.log(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

  return (
    <div className={style.conversas}>   
        <Header />
        <div className={style.conversasContainer}>
            <Contatos />
        </div>
    </div>
  )
}

export default Conversas