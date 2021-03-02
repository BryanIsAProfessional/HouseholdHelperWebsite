import '../all.css';
import React, { Component } from 'react';
import firebase from 'firebase/app';
import "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Database extends Component {
  constructor(props){
    super(props);
    this.state = {
      database: null,
      path: this.props.match.params.path,
      data: null,
      isConnected: false,
    };
  }

  async componentDidMount(){
    firebase.initializeApp(firebaseConfig);
    this.setState({database: firebase.database()}, () => {
      this.connect();
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.database !== nextState.database){return false;}
    return true;
  }

  async connect(){
    try{
      const {database, path} = this.state;
      console.log("Retrieving from " + path)
      await database.ref(path).on('value', snapshot => {
        if(snapshot.exists()){
          const val = snapshot.val();
          this.setState({data: val});
        }
      })

      this.setState({isConnected: true});
    }catch(e){
      console.error(e)
    }
    
  }

  render(){
    return(
      <div>{JSON.stringify(this.state.data)}</div>
    )
  }
}

export default Database;
