import React from 'react';
import style from './contatos.module.css'
import { FaMagnifyingGlass } from "react-icons/fa6"
import AddContact from '../AddContact/addContact'

const Contatos = () => {
  return (
    <div className={style.contatos}>
        <div className={style.caixaTitulo}>
            <h1>Conversas</h1>
            <AddContact />
        </div>
        <div className={style.caixaInput}>
            <FaMagnifyingGlass className={style.lupa}/>
            <input className={style.inputPesquisar} placeholder='Pesquisar ou começar uma nova conversa' type="text" name="" id="" />
        </div>
        <div className={style.caixaContatos}>
            <div className={style.contato}>
                <div className={style.caixaImg}>
                    <img src="https://avatars.githubusercontent.com/u/81927632?v=4" alt="imagem de perfil" className={style.imgPerfil}/>
                </div>
                <div className={style.caixaTexto}>
                    <h4>Nome do contato</h4>
                    <p>Última mensagem</p>
                </div>
                <div className={style.caixaHora}>
                    <p>00:00</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contatos