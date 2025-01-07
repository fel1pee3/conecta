import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import style from './Contato.module.css'
import InfoContato from '../InfoContato/InfoContato'
import EnvMsg from '../EnvMsg/EnvMsg'
import Header from '../Header/Header';
import Contatos from '../Contatos/Contatos';

const Contato = () => {

  return (
    <div className={style.contato}>
      <Header />
        <div className={style.contatoCaixa}>
          <Contatos />
          <div className={style.contatoContainer}>
            <InfoContato />
            <div className={style.mostrarMsgs}>
              <h1>mensagem</h1>
            </div>
            <EnvMsg />
          </div>
        </div>
    </div>
  )
}

export default Contato