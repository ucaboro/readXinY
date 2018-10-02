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

import request from 'superagent';

const ReadingBooks = [];

const ToReadBooks = [];

let books = [];

class searchBook extends Component {
  constructor(props){
    super(props)
    this.state = {
      isActive: false,
      activatedBook: '',
      isLoadingReading: false,
      isLoadingRead: false,
      searchQuery: '',
      searchQueryLoading: false,
    }
    this.getBookInfo = this.getBookInfo.bind(this)
    this.pushToReading = this.pushToReading.bind(this)
    this.pushToRead = this.pushToRead.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.findBooks = this.findBooks.bind(this)

  }

handleChange(event) {
  this.setState({searchQuery: event.target.value});
}

getAllBooks = (num, title, subtitle, cover, size) => {

  for (let i=1; i<num; i++){
    books.push( <Book key={i} id={i} title={title} subtitle={subtitle} size={size} onBookClick={this.getBookInfo}/> )
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



findBooks = () => {
  books = [];
  let query = this.state.searchQuery
  let numberOfBooks = 10
  if(query.length!=0 && query!=undefined){
    this.setState({searchQueryLoading: true})
  request
   .get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${numberOfBooks}`)
   .then(res => {
     console.log(res.body.items)
     console.log(res.body.items[0].volumeInfo.industryIdentifiers[0].identifier)//main
     console.log(res.body.items[0].volumeInfo.authors[0])//Authors
     console.log(res.body.items[0].volumeInfo.categories[0])//Main Category
     console.log(res.body.items[0].volumeInfo.imageLinks.smallThumbnail)//cover
     console.log(res.body.items[0].volumeInfo.infoLink)//link to google books
     console.log(res.body.items[0].volumeInfo.previewLink)//preview link to google books
     console.log(res.body.items[0].volumeInfo.publishedDate)
     console.log(res.body.items[0].volumeInfo.title)
     //console.log(res.body.items[0].volumeInfo.subtitle)
      // res.body, res.headers, res.status
      for (let i=0; i<numberOfBooks; i++){

      //ensuring fileds exist
      let identifier = ''
      if(res.body.items[i].volumeInfo.industryIdentifiers!==undefined){
      let idLength =  res.body.items[i].volumeInfo.industryIdentifiers.length
         identifier = res.body.items[i].volumeInfo.industryIdentifiers[0].identifier
      }

      let author =''
      if(res.body.items[i].volumeInfo.authors!==undefined){
       author = res.body.items[i].volumeInfo.authors[0]

      }else{
        author = 'no author'
      }

      let title = res.body.items[i].volumeInfo.title
      let cover = ''
      if(res.body.items[i].volumeInfo.imageLinks!==undefined){
       cover = res.body.items[i].volumeInfo.imageLinks.smallThumbnail
      }else{
        cover = 'http://d28hgpri8am2if.cloudfront.net/book_images/no_book_cover_hr.jpg'
      }


      let size = ''
      isBrowser ? size = 2 : size = 6

        books.push(<Book
           isSize={size}
           key={identifier}
           id={i}
           title={title}
           subtitle={author}
           size={3}
           cover={cover}
           onBookClick={this.getBookInfo}/>)}

      this.setState({searchQueryLoading: false})
   })
   .catch(err => {
      console.log(err)// err.message, err.response
   });
}
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
                  <Input onChange={this.handleChange} isSize="medium" type="text" placeholder="Start typing"/>
                  <span className="underline"></span>
                </Control>
                <Button onClick={this.findBooks} isLoading={this.state.searchQueryLoading!=false ? 'isLoading':''} isColor='info' isSize="medium" style={{marginLeft: '15px'}}>Search</Button>
               </Field>
          </Column>



          <Column>
            <Columns isCentered >
            {/*<ReadingContainer title="READING"/>*/}
            {isBrowser
              ?  <FoundContainerDesktop books={books}/>
            : <FoundContainerMobile books={books}/> }


            {/*<ToReadContainer title="TO READ"/>*/}
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
          <Subtitle isSize={4}>{title}</Subtitle>
          {/*<div className="divider"/>*/}
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
          <Subtitle isSize={4}>{title}</Subtitle>
          {/*<div className="divider"/>*/}
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
  <Column isSize={12}>
    <Box className="foundBox">
      <Subtitle isSize={3}>FOUND</Subtitle>
      <div className="divider"/>
      <Columns isMobile isMultiline className="foundScrollableDesktop scrollBar">
      {props.books}
      </Columns>
    </Box>
     <Button isColor='info' isSize="large" className="customButton" isOutlined>DONE</Button>
  </Column>
)

const FoundContainerMobile = (props) => (
  <Column isSize={12}>
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
