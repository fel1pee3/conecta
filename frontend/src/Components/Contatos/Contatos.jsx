import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './contatos.module.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import AddContact from '../AddContact/addContact';

const Contatos = () => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState(''); // Estado para armazenar o termo de busca
    const [error, setError] = useState('');

    useEffect(() => {
        // Função para buscar os contatos
        const fetchContacts = async () => {
            try {
                const token = localStorage.getItem('token'); // Pegue o token do localStorage

                const response = await axios.get('http://localhost:3000/contact/contactsSalved', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Passa o token no cabeçalho
                    },
                    params: {
                        search, // Envia o termo de busca como parâmetro
                    },
                });

                setContacts(response.data.contacts); // Salva os contatos no estado
            } catch (err) {
                setError('Erro ao buscar contatos.');
                console.error(err);
            }
        };

        fetchContacts(); // Chama a função sempre que o campo de busca mudar
    }, [search]); // Adiciona o estado "search" como dependência

    return (
        <div className={style.contatos}>
            <div className={style.caixaTitulo}>
                <h1>Conversas</h1>
                <AddContact />
            </div>
            <div className={style.caixaInput}>
                <FaMagnifyingGlass className={style.lupa} />
                <input
                    className={style.inputPesquisar}
                    placeholder='Pesquisar ou começar uma nova conversa'
                    type="text"
                    title='Pesquisar Contatos'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // Atualiza o estado ao digitar
                />
            </div>
            <div className={style.caixaContatos}>
                <ul className={style.listaContatos}>
                    {contacts.length > 0 ? (
                        contacts.map((contact) => (
                            <Link to={`/contato/${contact.id}`} key={contact.id} className={style.contato}>
                                <div className={style.caixaImg}>
                                    <img
                                        src="https://avatars.githubusercontent.com/u/81927632?v=4"
                                        alt="imagem de perfil"
                                        className={style.imgPerfil}
                                    />
                                </div>
                                <div className={style.caixaTexto}>
                                    <h4>{contact.contact_display_name}</h4>
                                    <p>Última mensagem</p>
                                </div>
                                <div className={style.caixaHora}>
                                    <p>00:00</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>{error || "Nenhum contato encontrado."}</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Contatos;
