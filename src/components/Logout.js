import '../all.css';
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button, Alert } from 'react-bootstrap';


function Logout() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    async function handleLogout(e){
        e.preventDefault();
    
        try{
          setError('');
          setLoading(true);
          await logout();
        }catch(e){
          setError('Failed to log out');
        }
    } 

    return (
        <>
        <div>Signed in as {currentUser.displayName || currentUser.email}</div>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Button disabled={loading} onClick={handleLogout}>Log Out</Button>
        </>
    );
}

export default Logout;
