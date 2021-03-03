import { useAuth } from '../contexts/AuthContext'

function NavBar() {
  const { currentUser } = useAuth();
  const login = currentUser ? "Logged in as " + (currentUser.displayName || currentUser.email) : "Log in"
  return (
    <div>NavBar<br/>
      <a href="/">Home</a><br/>
      <a href="/lists">Lists</a><br/>
      <a href="/login">{login}</a><br/>
      
      
    </div>
      
  );
}

export default NavBar;
