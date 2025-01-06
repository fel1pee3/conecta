import React from 'react'
import style from './SemMsg.module.css'
import img from "../../../images/logo-conecta-semfundo.png"


const SemMsg = () => {
  return (
    <div className={style.semMsg}>
        <img src={img} alt="logo da aplicação" className={style.logo} />
        <h3>Conecta para Desktop</h3>
        <p>Mantenha-se conectado com as pessoas que importam.</p>
        <p>Use o Conecta em até quatro dispositivos simultaneamente.</p>
    </div>
  )
}

export default SemMsg