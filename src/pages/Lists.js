import React, { Component } from 'react'
import List from '../components/List'
import { useAuth } from '../contexts/AuthContext'
import { DragDropContext } from 'react-beautiful-dnd'
import { database } from '../firebase'



class Lists extends Component {
  constructor(props){
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.writeList = this.writeList.bind(this);
    

    this.state = {
      database: null,
      userId: 0,
      data: null,
      isConnected: false,
    };
  }

  async componentDidMount(){
    
    this.setState({database: database}, () => {
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
            return (<List key={list.id + "," + index} list={list} items={list.items} index={index} database={this.state.database}/>)
          })}
        </DragDropContext>
      );
    }
  }
}

export default Lists;