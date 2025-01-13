import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { confirmAlert } from 'react-confirm-alert';
import Logo from "../../../images/logo-conecta-semfundo.png";
import style from './Header.module.css';
import './confirmAlert.css';

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('token'); // Remove o token
    navigate('/login'); // Redireciona para login
  };

  const handleLogout = () => {
    confirmAlert({
        title: 'Desconectar',
        message: 'Você tem certeza que deseja sair?',
        customUI: ({ onClose }) => (
        <div className="react-confirm-alert-wrapper">
            <div className="react-confirm-alert-container">
                {/* Título e mensagem dentro de uma div */}
                <div className="react-confirm-alert-message">
                    <h1>Desconectar</h1>
                    <p>Você tem certeza que deseja sair?</p>
                </div>

                {/* Botões dentro de outra div */}
                <div className="react-confirm-alert-buttons">
                    <button
                    onClick={() => {
                        handleConfirmLogout(); // Executa o logout
                        onClose(); // Fecha o diálogo
                    }}
                    >
                    Sim
                    </button>
                    <button onClick={onClose}>Não</button>
                </div>
            </div>
        </div>
        ),
    });
  };

  return (
    <div className={`${style.sidebar} ${isExpanded ? style.expanded : style.collapsed}`}>
        <span className={style.caixaLogo}>
            <img src={Logo} alt="logo da aplicação" className={style.logo} />
            {isExpanded && <span className={style.restoLogo}>onecta</span>}
        </span>
        <button className={style.toggleBtn} onClick={toggleSidebar} title="Abrir Navegação">
            {isExpanded ? <IoClose /> : <FiMenu />}
        </button>
        <ul className={style.menu}>
            <Link to='/' title="Conversas">
                <BiMessageRoundedDetail /> {isExpanded && <span>Conversas</span>}
            </Link>
            
            <Link to='/Register' title="Configuracões">
                <FaCog /> {isExpanded && <span>Configurações</span>}
            </Link>
            <Link onClick={handleLogout} className={style.logoutBtn} title="Desconectar">
                    <FaSignOutAlt /> {isExpanded && <span>Desconectar</span>}
            </Link>
        </ul>
    </div>
  );
};

export default Header;
