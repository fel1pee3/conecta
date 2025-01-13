import React, { useState } from 'react'
import axios from 'axios'
import styles from './AddContact.module.css'

const AddContact = () => {

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [showForm, setShowForm] = useState(false); // Controle para exibir o formulário

    const handleAddContact = async () => {
        try {
            const response = await axios.post('http://localhost:3000/contact/addContacts', {
                userId: 1, // Substitua pelo ID do usuário logado
                contactEmail: email,
                nickname: nickname,
            });
            alert(response.data.message);
            setEmail(''); // Limpa o campo de email
            setNickname(''); // Limpa o campo de apelido
            setShowForm(false); // Fecha o formulário após adicionar o contato
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Erro ao adicionar contato.");
        }
    };

  return (
    <div className={styles.addContact}>
            {/* Botão + para abrir o formulário */}
            {!showForm && (
                <button  title="Adicionar Contato" className={styles.addButton} onClick={() => setShowForm(true)}>
                    +
                </button>
            )}

            {/* Formulário de adicionar contato */}
            {showForm && (
                <div className={styles.formBackground}>
                    <div className={styles.formContainer}>
                        <h2>Adicionar Novo Contato</h2>
                        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                            {/* Campo para o apelido */}
                            <div className={styles.inputGroup}>
                                <input
                                    className={styles.addContactInput}
                                    type="text"
                                    id="nickname"
                                    placeholder="Digite um apelido para o contato"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    required
                                />
                            </div>
                            {/* Campo para o email */}
                            <div className={styles.inputGroup}>
                                <input
                                    className={styles.addContactInput}
                                    type="email"
                                    id="email"
                                    placeholder="Digite o email do contato"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            {/* Botão para adicionar contato */}
                            <div className={styles.buttonGroup}>
                                <button
                                    type="submit"
                                    onClick={handleAddContact}
                                    className={styles.button}
                                >
                                    Adicionar Contato
                                </button>
                                {/* Botão para cancelar */}
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className={styles.button}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
  )
}

export default AddContact