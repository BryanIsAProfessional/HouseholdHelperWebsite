import '../all.css'
import { useAuth } from '../contexts/AuthContext'

function NavBar() {
  const { currentUser } = useAuth();
  const login = currentUser ? "Logged in as " + (currentUser.displayName || currentUser.email) : "Log in";
  const profileLink = currentUser ? "/profile" : "/login";
  return (
    <div className="header">
      <div className="inner_header">
        <div className="logo_container">
          <h1><a href="/">Household<span>Helper</span></a></h1>
        </div>
        <ul className="navigation">
          <a href="/lists"><li>Lists</li></a>
          <a href={profileLink}><li>{login}</li></a>
        </ul>
      </div>      
    </div>
      
  );
}

export default NavBar;
