import React, { Component } from 'react'
import List from '../components/List'
import { DragDropContext } from 'react-beautiful-dnd'
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

class Lists extends Component {
  constructor(props){
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.writeList = this.writeList.bind(this);
    this.onChecked = this.onChecked.bind(this);

    this.state = {
      database: null,
      userId: 0,
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
      const {database} = this.state;
      let path = "users/" + this.state.userId;
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

  onDragEnd(result){
    const { destination, source, draggableId } = result;
  
    if(!destination){
      return;
    }
  
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ){
      return;
    }

    // splice the moved item into the list it was dragged on top of
    const list = this.state.data.lists[destination.droppableId];
    let listItems = null;
    if(list.items){
      listItems = [...list.items];
    }
    
    let removed = null;
    if(destination.droppableId === source.droppableId){
      [removed] = listItems.splice(source.index, 1);
    }else{
      const sourceList = this.state.data.lists[source.droppableId];
      const sourceListItems = [...sourceList.items];
      [removed] = sourceListItems.splice(source.index, 1);
    }

    if(list.items){
      listItems.splice(destination.index, 0, removed);
    }else{
      listItems = [removed];
    }
    

    // alter the list in the database
    this.writeList(this.state.userId, destination.droppableId, listItems);

    // if the item came from another list, remove it from that list
    if(destination.droppableId !== source.droppableId){
      this.deleteItem(this.state.userId, source.droppableId, source.index);
    }
  }

  writeList(userId, listId, listItems){
    if(!this.state.database){return}

    // removes any undefined values from our array
    listItems = listItems.filter(Boolean);

    this.state.database.ref("users/" + userId + "/lists/" + listId + "/items/").set(listItems);
  }

  onChecked(userId, listId, itemId, isChecked){
    if(!this.state.database){return}
    this.state.database.ref("users/" + userId + "/lists/" + listId + "/items/" + itemId + "/checked/").set(isChecked);
  }

  deleteItem(userId, listId, itemId){
    if(!this.state.database){return}
    this.state.database.ref("users/" + userId + "/lists/" + listId + "/items/" + itemId).remove();
  }

  render(){
    if(this.state.data == null){
      return <div>loading...</div>
    }else{
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.data.lists.map((list, index) => {  
            return (<List key={list.id + "," + index} list={list} items={list.items} index={index} onChecked={this.onChecked}/>)
          })}
        </DragDropContext>
      );
    }
  }
}

export default Lists;