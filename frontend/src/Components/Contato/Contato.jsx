import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import style from './Contato.module.css';
import InfoContato from '../InfoContato/InfoContato';
import EnvMsg from '../EnvMsg/EnvMsg';
import Header from '../Header/Header';
import Contatos from '../Contatos/Contatos';

const Contato = () => {
  const [messages, setMessages] = useState([]); // Lista de mensagens
  const { id } = useParams(); // Pega o receiverId da URL (destinatário)
  const token = localStorage.getItem('token'); // Obtém o token do localStorage

  useEffect(() => {
    // Função para buscar as mensagens
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/mensage/getMessages/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });
        setMessages(response.data.messages); // Atualiza o estado com as mensagens recebidas
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    };

    fetchMessages();
  }, [id, token]); // Recarrega quando receiverId ou token mudarem

  return (
    <div className={style.contato}>
      <Header />
      <div className={style.contatoCaixa}>
        <Contatos />
        <div className={style.contatoContainer}>
          <InfoContato />
          <div className={style.mostrarMsgs}>
            {/* Exibe as mensagens */}
            {messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`${style.message} ${message.sender_id === id ? style.received : style.sent}`}
                >
                  <div className={style.caixaMsg}>
                    <p>{message.content}</p>
                    <small>{new Date(message.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                  </div>
                </div>
              ))
            ) : (
              <p>Não há mensagens ainda.</p>
            )}
          </div>
          <EnvMsg setMessages={setMessages} /> {/* Passa a função para o componente de envio */}
        </div>
      </div>
    </div>
  );
};

export default Contato;
