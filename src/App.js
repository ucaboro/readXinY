import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import './App.css';
import {Columns, Column, Button, Title, Subtitle, Field, Control, Input, Box} from 'bloomer';
import Book from './Components/book.js'

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

class App extends Component {

getAllBooks = (num, size) => {
  let books = []
  for (let i=1; i<num; i++){
    books.push( <Book key ={i} title={"title " + i} subtitle={"subtitle " + i} size={size}/> )
   }

   return books
}

  render() {
    return(
      <div className="App">
        <Columns isCentered isMultiline  >
          <Column className="mainHeading" isSize={12}>
            <Title isSize={2}>Read X in Y</Title>
          </Column>


          <Column isSize={12}>
              <Field isHorizontal hasAddons="centered">
                <Control className="searchBooksInput">
                  <Input isSize="medium" type="text" placeholder="Start typing"/>
                  <span className="underline"></span>
                </Control>
               </Field>
          </Column>



          <Column>
            <Columns isCentered >
            <ReadingContainer title="READING"/>
            {isBrowser
              ?  <FoundContainerDesktop books={this.getAllBooks(9, 3)}/>
              : <FoundContainerMobile books={this.getAllBooks(9, 4)}/> }


            <ReadingContainer title="TO READ"/>
            </Columns>
          </Column>
        </Columns>

    </div>
    );
  }
}

const ReadingContainer = ({title}) => {
  if (isBrowser){
    return (
      <Column>
        <Box>
          <Subtitle isSize={3}>{title}</Subtitle>
          <div className="divider"/>
          <div className="placeholder"/>
        </Box>
      </Column>
    )
  }
    return ("")
}

const FoundContainerDesktop = (props) => (
  <Column isSize={5}>
    <Box className="foundBox">
      <Subtitle  isSize={3}>FOUND</Subtitle>
      <div className="divider"/>
      <Columns isMobile isMultiline className="foundScrollableDesktop scrollBar">
      {props.books}
      </Columns>
    </Box>
     <Button isColor='info' isSize="large" className="customButton" isOutlined>DONE</Button>
  </Column>
)

const FoundContainerMobile = (props) => (
  <Column isSize={5}>
    <Box className="foundBox">
      <Subtitle  isSize={3}>FOUND</Subtitle>
      <div className="divider"/>
      <Columns isMobile className="foundScrollableMobile scrollBar">
      {props.books}
      </Columns>
    </Box>
     <Button isColor='info' isSize="large" className="customButton" isOutlined>DONE</Button>
  </Column>
)





export default App;
