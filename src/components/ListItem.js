import { Component } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

class ListItem extends Component {
  render(){
    return (
        <Draggable draggableId={"" + this.props.item.id} key={this.props.item.id} index={this.props.index}>
            {provided => {
                return(
                    <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                      <input
                        type="checkbox"
                        checked={this.props.item.checked}
                        onChange={this.props.onChecked}
                      />
                        {this.props.item.content} | id: {this.props.item.id} | key: {this.props.item.id}
                    </Container>
                )
            }}
        </Draggable>
    );
  }
}

export default ListItem;
