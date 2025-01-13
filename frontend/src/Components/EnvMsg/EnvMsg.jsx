import React, { useState } from 'react';
import { IoIosSend } from "react-icons/io";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import style from './EnvMsg.module.css';

const EnvMsg = ({ setMessages }) => {
  const [content, setContent] = useState(''); // Estado para o conteúdo da mensagem
  const [error, setError] = useState(null);
  const { id } = useParams(); // Pega o receiverId da URL (destinatário)
  const token = localStorage.getItem('token'); // Obtém o token do localStorage

  const sendMessage = async () => {
    if (!content.trim()) {
      setError('Por favor, escreva uma mensagem.');
      return;
    }

    try {
      // Envia a mensagem
      await axios.post(
        `http://localhost:3000/mensage/sendMessage/${id}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setContent(''); // Limpa o campo de mensagem
      setError(null); // Limpa mensagens de erro

      // Busca mensagens atualizadas
      const response = await axios.get(
        `http://localhost:3000/mensage/getMessages/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Atualiza as mensagens na tela
      setMessages(response.data.messages);
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao enviar a mensagem.');
    }
  };

  return (
    <div className={style.envMsg}>
      <div className={style.caixaInput}>
        <input
          className={style.inputEnvMsg}
          placeholder="Mensagem"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)} // Atualiza o conteúdo da mensagem
        />
        <button title="Enviar Mensagem" className={style.btnSend} onClick={sendMessage}>
          <IoIosSend />
        </button>
      </div>
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};

export default EnvMsg;
