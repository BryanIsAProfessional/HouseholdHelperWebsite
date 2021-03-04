import React from 'react'
import { database } from '../firebase'
import { useList } from 'react-firebase-hooks/database'
import { DragDropContext } from 'react-beautiful-dnd'
import ListItem from '../components/ListItem'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const ListContainer = styled.div`
  padding: 8px;
`;

export default function List(props) {
    let path = "/lists/" + props.listId;
    let listsRef = database.ref(path);
    const [snapshots, loading, error] = useList(listsRef);

    // unpack snapshot array to json
    let data = {}
    snapshots.map((item) => data[item.key] = item.val())
    console.log(data);

    let onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
    
        console.log(data);
    
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
        const listItems = data.items;
        
        let removed = null;
        if(destination.droppableId === source.droppableId){
          [removed] = listItems.splice(source.index, 1);
        }else{
          const sourceList = data.lists[source.droppableId];
          const sourceListItems = [...sourceList.items];
          [removed] = sourceListItems.splice(source.index, 1);
        }
    
        if(listItems && listItems.length > 0){
          listItems.splice(destination.index, 0, removed);
        }else{
          listItems = [removed];
        }
        
    
        // alter the list in the database
        writeList(destination.droppableId, listItems);
    
        // if the item came from another list, remove it from that list
        if(destination.droppableId !== source.droppableId){
          deleteItem(source.droppableId, source.index);
        }
      }
    
      let writeList = (listId, listItems) => {
        if(!database){return}
    
        // removes any undefined values from our array
        listItems = listItems.filter(Boolean);
    
        database.ref("/lists/" + listId + "/items/").set(listItems);
      }
    
      let deleteItem = (userId, listId, itemId) => {
        if(!this.state.database){return}
        this.state.database.ref("users/" + userId + "/lists/" + listId + "/items/" + itemId).remove();
      }

    if(loading){
        return(<div>Loading..</div>)
        
    }else{
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                {!loading && snapshots ?
                    (<Container>
                        <Title>{data.title} | droppableId: {data.index} | key: {props.listId}</Title>
                        <Droppable droppableId={"" + data.index} key={props.listId}>
                            {provided => {
                                return(
                                    <ListContainer ref={provided.innerRef}{...provided.droppableProps}{...provided.dragHandleProps}>
                                        {data && data.items.map((item, index) => {
                                            return <ListItem key={item.id + "," + index} item={item} index={index} onChecked={null}/>
                                        })}
                                        {provided.placeholder}
                                    </ListContainer>
                                )}}
                        </Droppable>
                        
                    </Container>) : <div>asdfkjl</div>
                }
            </DragDropContext>
        );
    }
}