import express from 'express';
import { connectToDatabase } from '../lib/db.js';
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router();

router.post('/sendMessage/:receiverId', verifyToken, async (req, res) => {
  const senderId = req.userId; // Obtém o ID do usuário logado
  const { content } = req.body; // Obtém o conteúdo da mensagem
  const { receiverId } = req.params; // Recebe o ID do destinatário da URL

  try {
      const db = await connectToDatabase();

      // Verificar se o destinatário existe
      const [receiver] = await db.query('SELECT id FROM users WHERE id = ?', [receiverId]);
      if (receiver.length === 0) {
          return res.status(404).json({ message: 'Destinatário não encontrado.' });
      }

      // Inserir a mensagem na tabela `messages`
      await db.query(
          'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
          [senderId, receiverId, content]
      );

      res.status(201).json({ message: 'Mensagem enviada com sucesso.' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao enviar a mensagem.' });
  }
});

router.get('/getMessages/:receiverId', verifyToken, async (req, res) => {
  const senderId = req.userId; // Obtém o ID do usuário logado a partir do token
  const { receiverId } = req.params; // Recebe o ID do destinatário da URL

  try {
      const db = await connectToDatabase();

      // Verificar se o destinatário existe
      const [receiver] = await db.query('SELECT id FROM users WHERE id = ?', [receiverId]);
      if (receiver.length === 0) {
          return res.status(404).json({ message: 'Destinatário não encontrado.' });
      }

      // Buscar todas as mensagens entre o usuário logado e o destinatário
      const [messages] = await db.query(
          'SELECT id, sender_id, receiver_id, content, is_read, sent_at FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY sent_at ASC',
          [senderId, receiverId, receiverId, senderId]
      );

      res.status(200).json({ messages });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar as mensagens.' });
  }
});

export default router;