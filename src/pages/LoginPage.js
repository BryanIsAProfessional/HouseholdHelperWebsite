import '../all.css';
import { Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import Login from '../components/Login';
import Logout from '../components/Logout';

function LoginPage() {

  const { currentUser } = useAuth();
  if(currentUser){
    return(
      <Logout/>
    )
  }else{
    return (
      <Container>
        <Login/>
        <a href="/signup">Create an account</a>
      </Container>
    );
  }
  
}

export default LoginPage;
