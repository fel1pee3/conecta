import React from 'react'
import style from './EnvMsg.module.css'

const EnvMsg = () => {
  return (
    <div className={style.envMsg}> 
        <div className={style.caixaInput}>
            <input className={style.inputEnvMsg} placeholder='Mensagem' type="text" name="" id="" />
        </div>
    </div>
  )
}

export default EnvMsg