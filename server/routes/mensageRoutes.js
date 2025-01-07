import express from 'express';
import { connectToDatabase } from '../lib/db.js';
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router();

router.post('/messages/:contactId', verifyToken, async (req, res) => {
    const senderId = req.userId; // ID do usuário logado
    const receiverId = req.params.contactId; // ID do contato que receberá a mensagem
    const { content } = req.body; // Conteúdo da mensagem enviada
  
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'A mensagem não pode estar vazia.' });
    }
  
    try {
      const db = await connectToDatabase();
  
      // Verifica se o destinatário (contato) existe e está na lista de contatos do usuário logado
      const [contactExists] = await db.query(
        `SELECT * FROM contacts WHERE user_id = ? AND contact_user_id = ?`,
        [senderId, receiverId]
      );
  
      if (contactExists.length === 0) {
        return res
          .status(404)
          .json({ message: 'Contato não encontrado ou não autorizado.' });
      }
  
      // Insere a mensagem na tabela "messages"
      const [result] = await db.query(
        `INSERT INTO messages (sender_id, receiver_id, content, sent_at) VALUES (?, ?, ?, NOW())`,
        [senderId, receiverId, content]
      );
  
      if (result.affectedRows === 1) {
        return res.status(201).json({ message: 'Mensagem enviada com sucesso!' });
      } else {
        return res
          .status(500)
          .json({ message: 'Erro ao salvar a mensagem no banco de dados.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao enviar a mensagem.' });
    }
  });
  

export default router;