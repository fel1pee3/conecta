import React from 'react'
import style from './InfoContato.module.css'

const InfoContato = () => {
  return (
    <div className={style.infoContato}>
        <div className={style.caixaImg}>
            <img src="https://avatars.githubusercontent.com/u/81927632?v=4" alt="imagem de perfil" className={style.imgPerfil}/>
        </div>
        <div className={style.caixaTexto}>
            <h4>Nome Contato</h4>
        </div>
    </div>
  )
}

export default InfoContato