import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function FormRegisterComponent() {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // Evita refresh

    console.log(fullname, username, email, password);

    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          fullname,
          username,
          email,
          password,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const data = await response.json();
      console.log('Risposta server:', data);

      if (response.ok) {
        alert('Registrazione completata!');
      } else {
        alert('Errore: ' + data.message);
      }

    } catch (err) {
      console.error('Errore durante la registrazione:', err);
    }
  };

  return (
    <Form onSubmit={handleRegister} className="w-100">
      <h1 className="text-center">Register</h1>

      <Form.Group className="mb-3" controlId="fullname">
        <Form.Control
          type="text"
          placeholder="Fullname..."
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="username">
        <Form.Control
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Control
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Control
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="dark" type="submit" className="w-100" id="registerSubmit">
        Register
      </Button>
    </Form>
  );
}
