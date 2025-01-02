import express from 'express'
import {connectToDatabase} from '../lib/db.js'

const router = express.Router()

router.post('/contacts', async (req, res) => {
    const { userId, contactEmail } = req.body;
    try {
        const db = await connectToDatabase();

        const [rows] = await db.query('SELECT * FROM contacts WHERE user_id = ? AND contact_email = ?', [userId, contactEmail]);
        if (rows.length > 0) {
            return res.status(409).json({ message: "Contato já existe para este usuário." });
        }

        await db.query('INSERT INTO contacts (user_id, contact_email) VALUES (?, ?)', [userId, contactEmail]);

        res.status(201).json({ message: "Contato adicionado com sucesso." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao adicionar contato." });
    }
});
