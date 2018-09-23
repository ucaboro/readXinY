import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import React, { Component } from 'react';
import {Columns, Column, Button, Title, Subtitle, Field, Control, Input, Box} from 'bloomer';import Book from '../Components/book.js'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

export default class dnd extends Component {
  state = {
      items: getItems(10),
      selected: getItems(5,10)
  };

  /**
       * A semi-generic way to handle multiple lists. Matches
       * the IDs of the droppable container to the names of the
       * source arrays stored in the state.
       */
      id2List = {
          droppable: 'items',
          droppable2: 'selected'
      };



      getList = id => this.state[this.id2List[id]];

      onDragEnd = result => {
          const { source, destination } = result;

          // dropped outside the list
          if (!destination) {
              return;
          }

          if (source.droppableId === destination.droppableId) {
              const items = reorder(
                  this.getList(source.droppableId),
                  source.index,
                  destination.index
              );

              let state = { items };

              if (source.droppableId === 'droppable2') {
                  state = { selected: items };
              }

              this.setState(state);
          } else {
              const result = move(
                  this.getList(source.droppableId),
                  this.getList(destination.droppableId),
                  source,
                  destination
              );

              this.setState({
                  items: result.droppable,
                  selected: result.droppable2
              });
          }
      };

      // Normally you would want to split things out into separate components.
      // But in this example everything is just done in one place for simplicity
      render() {
          return (
            <DragDropContext onDragEnd={this.onDragEnd}>

            <Columns isCentered  >
            <Column>
              <Box>
                <Subtitle isSize={3}>READING</Subtitle>
                <div className="divider"/>


                <Droppable droppableId="droppable">

                {(provided, snapshot) => (
                  <Columns isCentered isMultiline isGrid>
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {this.state.items.map((item, index) => (

                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        {item.content}
                                    </div>
                                )}

                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                    </Columns>

                )}

            </Droppable>

              </Box>
            </Column>

            <Column>
              <Box>
                <Subtitle isSize={3}>FOUND</Subtitle>
                <div className="divider"/>


                <Droppable droppableId="droppable2" direction='horizontal'>

                {(provided, snapshot) => (
                  <Columns isCentered isMultiline isGrid>
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        >
                        {this.state.selected.map((item, index) => (

                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (

                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle2(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                      {item.content}
                                    </div>

                                )}
                            </Draggable>

                        ))}
                        {provided.placeholder}
                    </div>
                    </Columns>
                )}

            </Droppable>

              </Box>
            </Column>


            </Columns>
          </DragDropContext>


          );
      }
  }


  const getAllBooks = (num, size) => {
    let books = []
    for (let i=1; i<num; i++){
      books.push( <Book key ={i} title={"title " + i} subtitle={"subtitle " + i} size={size}/> )
     }

     return books
  }

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k + offset}`,
      content: <Book key ={k} title={"title " + k} subtitle={"subtitle " + k} size={12}/>
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};



/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    console.log(result)
    return result;
};

const grid = 8;



const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    display:'inline-block',
    padding: grid ,
    margin: `${grid}px 0 ${grid}px ${grid}px`,
    width: '30%',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getItemStyle2 = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    display:'inline-block',
    padding: grid ,
    margin: `${grid}px 0 ${grid}px ${grid}px`,
    width: '30%',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
});
