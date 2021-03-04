import List from '../components/List'
import { useAuth } from '../contexts/AuthContext'
import { database } from '../firebase'
import { useList } from 'react-firebase-hooks/database'

export default function Lists() {
  const { currentUser } = useAuth();
  let path = "/users/" + currentUser.uid + "/lists/";
  let userDataRef = database.ref(path);
  const [snapshots, loading, error] = useList(userDataRef);

  return (
    <div>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Loading...</span>}
      <div>
        {!loading && snapshots &&
          <div>
            {snapshots.map((list, index) => {
              return (<List key={list.id + "," + index} listId={list.val()}/>)
            })}
          </div>
        }
      </div>
    </div>
  )
}