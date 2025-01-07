import express from 'express';
import { connectToDatabase } from '../lib/db.js';
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router();

router.post('/addContacts', async (req, res) => {
    const { userId, contactEmail, nickname } = req.body;

    try {
        const db = await connectToDatabase();

        // Buscar o ID do contato pelo email
        const [contact] = await db.query('SELECT id FROM users WHERE email = ?', [contactEmail]);

        if (contact.length === 0) {
            return res.status(404).json({ message: "Usuário com este email não encontrado." });
        }

        const contactUserId = contact[0].id;

        // Verificar se o contato já existe
        const [existingContact] = await db.query(
            'SELECT * FROM contacts WHERE user_id = ? AND contact_user_id = ?',
            [userId, contactUserId]
        );

        if (existingContact.length > 0) {
            return res.status(409).json({ message: "Contato já existe para este usuário." });
        }

        // Inserir o novo contato com o apelido
        await db.query(
            'INSERT INTO contacts (user_id, contact_user_id, nickname) VALUES (?, ?, ?)',
            [userId, contactUserId, nickname]
        );

        res.status(201).json({ message: "Contato adicionado com sucesso." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao adicionar contato." });
    }
});

router.get('/contactsSalved', verifyToken, async (req, res) => {
    const userId = req.userId; // ID do usuário logado, obtido do token
    const search = req.query.search || ''; // Pega o termo de busca (se existir)

    try {
        const db = await connectToDatabase();

        // Buscar todos os contatos do usuário logado, com suporte a busca
        const [contacts] = await db.query(`
            SELECT c.id, 
                   IFNULL(c.nickname, u.email) AS contact_display_name
            FROM contacts c
            LEFT JOIN users u ON u.id = c.contact_user_id
            WHERE c.user_id = ?
              AND (IFNULL(c.nickname, u.email) LIKE ?)
        `, [userId, `%${search}%`]);

        // Verifica se há contatos
        if (contacts.length === 0) {
            return res.status(404).json({ message: "Nenhum contato encontrado." });
        }

        // Retorna os contatos com apelido ou email
        res.status(200).json({ contacts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao listar contatos." });
    }
});

router.get('/contact/:id', verifyToken, async (req, res) => {
    const userId = req.userId; // ID do usuário logado, obtido do token
    const contactId = req.params.id; // ID do contato passado na URL

    try {
        const db = await connectToDatabase();

        // Buscar o contato pelo ID, pertencente ao usuário logado
        const [result] = await db.query(`
            SELECT c.id, 
                   IFNULL(c.nickname, u.email) AS contact_display_name
            FROM contacts c
            LEFT JOIN users u ON u.id = c.contact_user_id
            WHERE c.user_id = ? AND c.id = ?
        `, [userId, contactId]);

        // Verifica se o contato foi encontrado
        if (result.length === 0) {
            return res.status(404).json({ message: "Contato não encontrado." });
        }

        // Retorna o nickname ou email relacionado ao ID do contato
        res.status(200).json({
            id: result[0].id,
            contact_display_name: result[0].contact_display_name,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar o contato." });
    }
});

export default router;
