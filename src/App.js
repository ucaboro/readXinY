import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import './App.css';
import {Columns, Column, Button, Title, Subtitle, Field, Control, Input, Box} from 'bloomer';

class App extends Component {
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
                  <Input isSize="medium"   type="text" placeholder="Start typing"/>
                  <span className="underline"></span>
                </Control>
               </Field>
          </Column>

          <Column>
            <Columns isCentered>
              <Column>
                <Box>
                  <Subtitle isSize={3}>READING</Subtitle>
                  <div className="divider"/>
                  <div className="placeholder"/>
                </Box>
              </Column>

              <Column isSize={5}>
                <Box>
                  <Subtitle  isSize={3}>FOUND</Subtitle>
                  <div className="divider"/>
                  <div className="placeholderFound"/>
                </Box>
                 <Button isColor='info' isSize="large" className="customButton" isOutlined>DONE</Button>
              </Column>

              <Column>
                <Box>
                  <Subtitle  isSize={3}>TO READ</Subtitle>
                  <div className="divider"/>
                  <div className="placeholder"/>
                </Box>
              </Column>

            </Columns>
          </Column>
        </Columns>

    </div>
    );
  }
}

export default App;
