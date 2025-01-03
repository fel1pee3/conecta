import express from 'express';
import { connectToDatabase } from '../lib/db.js';

const router = express.Router();

router.post('/contacts', async (req, res) => {
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


export default router;
