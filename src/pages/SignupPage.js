import '../all.css';
import { Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import Logout from '../components/Logout';
import Signup from '../components/Signup';

function LoginPage() {

  const { currentUser } = useAuth();
  if(currentUser){
    return(
      <Logout/>
    )
  }else{
    return (
      <Container>
        <Signup/>
        <div>Already have an account? <a href="/login">Log in here!</a></div>
      </Container>
    );
  }
  
}

export default LoginPage;
