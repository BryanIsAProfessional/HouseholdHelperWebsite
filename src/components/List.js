import React, { Component } from 'react'
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

class List extends Component {
    render(){
        if(this.props.list.items && this.props.list.items.length > 0){
            return (
                <Container>
                    <Title>{this.props.list.title} | droppableId: {this.props.index} | key: {this.props.list.id}</Title>
                    <Droppable droppableId={"" + this.props.index} key={this.props.list.id}>
                        {provided => {
                            return(
                                <ListContainer ref={provided.innerRef}{...provided.droppableProps}{...provided.dragHandleProps}>
                                    {this.props.items.map((item, index) => {
                                        return <ListItem key={item.id + "," + index} item={item} index={index} onChecked={this.props.onChecked}/>
                                    })}
                                    {provided.placeholder}
                                </ListContainer>
                            )}}
                    </Droppable>
                    
                </Container>
                
            );
        }else{
            return (
                <Container>
                    <Title>{this.props.list.title} | droppableId: {this.props.index} | key: {this.props.list.id}</Title>
                    <Droppable droppableId={"" + this.props.index} key={this.props.list.id}>
                        {provided => {
                            return(
                                <ListContainer ref={provided.innerRef}{...provided.droppableProps}{...provided.dragHandleProps}>
                                    {provided.placeholder}
                                </ListContainer>
                            )}}
                    </Droppable>
                    
                </Container>
            )
        }
        
    }
}

export default List;
