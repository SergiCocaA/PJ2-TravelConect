import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { getChatMessages, sendChatMessage } from '../servicios/api';

const TripChat = ({ tripId, usuario }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMsg = async () => {
    setLoading(true);
    try {
      const { data } = await getChatMessages(tripId);
      setMessages(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchMsg(); }, [tripId]);

  const onSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await sendChatMessage(tripId, { contingut: text });
      setText('');
      fetchMsg();
    } catch (e) { alert("Error al enviar"); }
  };

  return (
    <div className="p-3 border rounded bg-white">
      <div className="d-flex justify-content-between mb-2">
        <h6>Chat del Grupo</h6>
        <Button size="sm" variant="light" onClick={fetchMsg}>Actualizar</Button>
      </div>

      <div>
        {messages.map(m => (
          <div className="mb-2 p-2 border rounded">
            <strong className="text-primary small">{m.autor_nom || 'Usuario'}</strong>
            <p className="mb-0">{m.contingut}</p>
          </div>
        ))}
      </div>

      <Form onSubmit={onSend} className="d-flex gap-1">
        <Form.Control
          size="sm"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Escribe aquí..."
        />
        <Button size="sm" type="submit" disabled={loading}>Enviar</Button>
      </Form>
    </div>
  );
};

export default TripChat;