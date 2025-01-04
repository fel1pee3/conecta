import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from './Contato.module.css'
import InfoContato from '../InfoContato/InfoContato'
import EnvMsg from '../EnvMsg/EnvMsg'

const Contato = () => {



  return (
    <div className={style.contato}>
        <InfoContato />
        <div className={style.mostrarMsgs}>
          
        </div>
        <EnvMsg />
    </div>
  )
}

export default Contato