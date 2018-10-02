import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import '../App.css';
import {Columns, Column, Button,
        Title, Subtitle, Field,
        Control, Input, Box,
        Modal, ModalBackground, ModalContent,
        ModalClose, Media, MediaLeft, MediaRight,
        MediaContent, Icon, Image, Content, Level,
        Delete, LevelLeft, LevelItem, Progress, Select} from 'bloomer';
import Book from '../Components/book.js'
import {
        BrowserView,
        MobileView,
        isBrowser,
        isMobile
      } from "react-device-detect";



const ReadingBooks = [];

const ToReadBooks = [];

      export default class main extends Component {
        constructor(props){
          super(props)
          this.state = {
            isActive: false,
            activatedBook: '',
            isLoadingReading: false,
            isLoadingRead: false,
          }
          //this.getBookInfo = this.getBookInfo.bind(this)
          //this.pushToReading = this.pushToReading.bind(this)
          //this.pushToRead = this.pushToRead.bind(this)

        }



render(){

  return(
    <div className="App">
      <Columns isCentered isMultiline  >
          <Column isSize={12}>
            <Title>READ <input placeholder='  X' className='XandYinput'/> IN <input placeholder='  Y' className='XandYinput'/>
                      &nbsp;&nbsp;&nbsp;
                      <Select  isSize='medium' style={{}} >
                            <option>DAYS</option>
                            <option>WEEKS</option>
                            <option>MONTHS</option>
                        </Select>
                        &nbsp;&nbsp;&nbsp;
                        <Button isColor='info' isSize="medium" >Track it!</Button>
            </Title>
          </Column>

        <Column>
          <Columns isCentered >
          <ReadingContainer title="READING"/>
          <ToReadContainer title="TO READ"/>
          </Columns>
        </Column>

      </Columns>

    </div>
  )
}
}

const ReadingContainer = ({title}) => {
  if (isBrowser){
    return (
      <Column>
        <Progress isSize='medium' isColor='info' style={{marginBottom:'-15px'}} value={45} max={100}/>
        <Box>
          <Subtitle isSize={3}>{title}</Subtitle>
          <div className="divider"/>
          <Columns isMobile isMultiline className="foundScrollableDesktop scrollBar">
          {ReadingBooks}
          </Columns>
        </Box>
      </Column>
    )
  }
    return ("")
}

const ToReadContainer = ({title}) => {
  if (isBrowser){
    return (
      <Column>
        <Progress isSize='medium' isColor='info' style={{marginBottom:'-15px', visibility: 'hidden'}} value={45} max={100}/>
        <Box>
          <Subtitle isSize={3}>{title}</Subtitle>
          <div className="divider"/>
            <Columns isMobile isMultiline className="foundScrollableDesktop scrollBar">
            {ToReadBooks}
            </Columns>
        </Box>
      </Column>
    )
  }
    return ("")
}
