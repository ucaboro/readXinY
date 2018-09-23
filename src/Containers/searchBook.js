import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import '../App.css';
import {Columns, Column, Button,
        Title, Subtitle, Field,
        Control, Input, Box,
        Modal, ModalBackground, ModalContent,
        ModalClose, Media, MediaLeft, MediaRight,
        MediaContent, Icon, Image, Content, Level,
      Delete, LevelLeft, LevelItem} from 'bloomer';
import Book from '../Components/book.js'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const ReadingBooks = [];

const ToReadBooks = [];

class searchBook extends Component {
  constructor(props){
    super(props)
    this.state = {
      isActive: false,
      activatedBook: '',
      isLoadingReading: false,
      isLoadingRead: false,
    }
    this.getBookInfo = this.getBookInfo.bind(this)
    this.pushToReading = this.pushToReading.bind(this)
    this.pushToRead = this.pushToRead.bind(this)

  }

getAllBooks = (num, size) => {
  let books = []
  for (let i=1; i<num; i++){
    books.push( <Book key={i} id={i} title={"title " + i} subtitle={"subtitle " + i} size={size} onBookClick={this.getBookInfo}/> )
   }

   return books
}

pushToReading = () =>{
this.setState({
  isLoadingReading: true
})
  if(this.state.activatedBook!=null){
    let num = this.state.activatedBook
    var b =  document.getElementById(this.state.activatedBook)
    let pic = b.children[0].children[0]
    let title = b.childNodes[1].textContent
    let subtitle = b.children[2].textContent

    ReadingBooks.push(<Book key={num+title} id={num} title={title} subtitle={subtitle} size={3} onBookClick={this.getBookInfo}/>)

    setTimeout(
    function() {
        this.setState({isLoadingReading: false,
        isActive: !this.state.isActive});
    }
    .bind(this),
    500
);

  }
}

pushToRead = () =>{
this.setState({
  isLoadingRead: true
})
  if(this.state.activatedBook!=null){
    let num = this.state.activatedBook
    var b =  document.getElementById(this.state.activatedBook)
    let pic = b.children[0].children[0]
    let title = b.childNodes[1].textContent
    let subtitle = b.children[2].textContent

    ToReadBooks.push(<Book key={num+title} id={num} title={title} subtitle={subtitle} size={3} onBookClick={this.getBookInfo}/>)

    setTimeout(
    function() {
        this.setState({isLoadingRead: false,
        isActive: !this.state.isActive});
    }
    .bind(this),
    500
);
  }
}


getBookInfo = (e) =>{
  if(this.state.isActive!=true){

    this.setState({
      activatedBook: e.target.parentNode.getAttribute('id')
    })
  }
this.setState ({
    isActive: !this.state.isActive
})



}


  render() {
    return(
      <div className="App">
      <BookPopup
        isActive={this.state.isActive!=false?'is-active':''}
        closeModal={this.getBookInfo}
        activatedBook={this.state.activatedBook}
        readingClick={this.pushToReading}
        toReadClick={this.pushToRead}
        isLoadingRead={this.state.isLoadingRead!=false?'is-loading':''}
        isLoadingReading={this.state.isLoadingReading!=false?'is-loading':''}/>
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
              ?  <FoundContainerDesktop books={this.getAllBooks(9, 2)}/>
              : <FoundContainerMobile books={this.getAllBooks(9, 4)}/> }


            <ToReadContainer title="TO READ"/>
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


const MediaPlaceholder = (props) =>(
  <Media>
  <MediaLeft>
      <Image isSize='64x64' src='https://via.placeholder.com/128x128' />
  </MediaLeft>
  <MediaContent>
      <Content>
          <p>
              <strong>John Wick</strong> <small>@JohnWick</small> <small>'31m'</small>
              <br />
              People Keep Asking If I’m Back, And I Haven’t Really Had An Answer, But Now, Yeah, I’m Thinking I’m Back.
          </p>
      </Content>
  </MediaContent>
</Media>
)

const BookPopup = (props) =>(
  <Modal className = {props.isActive}>
    <ModalBackground onClick={props.closeModal}/>
    <ModalContent>
    <Box>
    <Columns isCentered isMultiline>
    <Column isSize={12}>
    Book information id:{props.activatedBook}
    </Column>

    <Column>
    <MediaPlaceholder/>
    </Column>

    <Column isSize={12}>
    <Columns>
    <Column isSize={5}>
    <Button isLoading={props.isLoadingReading} isColor='info' isSize='medium' onClick={props.readingClick}><p>Add to   <b> READING NOW</b></p></Button>
    </Column>
    <Column/>
    <Column isSize={5}>
    <Button isLoading={props.isLoadingRead} isColor='warning' isSize='medium' onClick={props.toReadClick}><p>Add to   <b> READ LATER</b></p></Button>
    </Column>
    </Columns>
    </Column>

    </Columns>
    </Box>
    </ModalContent>
    <ModalClose onClick={props.closeModal} />
</Modal>
)


export default searchBook;
