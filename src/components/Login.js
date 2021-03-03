import '../all.css';
import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();

    try{
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    }catch(e){
      setError('Failed to log in');
    }
    
    setLoading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2>Log In</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required/>
            </Form.Group>
            <Button disabled={loading} type="submit">Log In</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default Login;