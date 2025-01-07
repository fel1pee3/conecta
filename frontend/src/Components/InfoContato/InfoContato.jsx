import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './infoContato.module.css'
import { useParams } from 'react-router-dom';

const InfoContato = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        // Faz a requisição para a API, enviando o token no cabeçalho
        const response = await axios.get(`http://localhost:3000/contact/contact/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Substitua se o token estiver armazenado em outro lugar
          },
        });

        // Define o contato obtido na resposta
        setContact(response.data);
      } catch (err) {
        // Define o erro, caso ocorra
        setError(err.response?.data?.message || 'Erro ao buscar o contato.');
      } finally {
        setLoading(false); // Termina o carregamento
      }
    };

    fetchContact();
  }, [id]);

  // Renderização condicional
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  /*
    <div className={style.infoContato}>
        <div className={style.caixaImg}>
            <img src="https://avatars.githubusercontent.com/u/81927632?v=4" alt="imagem de perfil" className={style.imgPerfil}/>
        </div>
        <div className={style.caixaTexto}>
            <h4>Nome Contato</h4>
        </div>
    </div>
  */

  return (
    <div className={style.infoContato}>
      {contact ? (
        <div className={style.infoContatoContainer}>
          <div className={style.caixaImg}>
            <img src="https://avatars.githubusercontent.com/u/81927632?v=4" alt="imagem de perfil" className={style.imgPerfil}/>
          </div>
          <div className={style.caixaTexto}>
              <h4>{contact.contact_display_name}</h4>
          </div>
        </div>
      ) : (
        <p>Contato não encontrado.</p>
      )}
    </div>
  );
};

export default InfoContato;
