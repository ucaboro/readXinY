import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import '../App.css';
import {Columns, Column, Button,
        Title, Subtitle, Field,
        Control, Input, Box,
        Modal, ModalBackground, ModalContent,
        ModalClose, Media, MediaLeft, MediaRight,
        MediaContent, Icon, Image, Content, Level,
      Delete, LevelLeft, LevelItem, Label, TextArea} from 'bloomer';
import Book from '../Components/book.js'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


import request from 'superagent';
import { withRouter, Link } from "react-router-dom";


export const ReadingBooks = [];

export const ToReadBooks = [];

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

      activatedTitle: '',
      activatedSubtitle:'',
      activatedAuthor:'',
      activatedDesc:'',
      activatedLink:'',
      activatedCover:'n',
      activatedRank:'',
      activatedCategories:'',
      activatedBookReadMore: false,
    }
    this.getBookInfo = this.getBookInfo.bind(this)
    this.pushToReading = this.pushToReading.bind(this)
    this.pushToRead = this.pushToRead.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.findBooks = this.findBooks.bind(this)
         books = []
  }

clickDone = () =>{
  let clickedTab = document.getElementById('mainTab')
  let newClass = ' '
  let tabsNum = document.getElementById('tabs').childNodes.length
  for (let i=0; i<tabsNum;i++){
      document.getElementById('tabs').childNodes[i].setAttribute( 'class', newClass );
  }
  clickedTab.setAttribute( 'class', 'is-active' )
}


closeModal = () =>{
  this.setState({
    isActive: false,
    activatedBookReadMore: false
  })
}

handleChange(event) {
  this.setState({searchQuery: event.target.value});
}

getAllBooks = (num, title, subtitle, cover, size) => {

  for (let i=1; i<num; i++){
    books.push( <Book key={i} id={i} title={title} subtitle={subtitle} isSize={size} onBookClick={this.getBookInfo}/> )
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
    let pic = b.children[0].children[0].src
    let title = b.childNodes[1].textContent
    let subtitle = b.children[2].textContent


    ReadingBooks.push(<Book key={num+title} id={num} title={title} subtitle={subtitle} size={3} cover={pic} onBookClick={this.props.onBookClick}/>)

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
    let pic = b.children[0].children[0].src
    let title = b.childNodes[1].textContent
    let subtitle = b.children[2].textContent


    ToReadBooks.push(<Book key={num+title} id={num} title={title} subtitle={subtitle} size={3} cover={pic} onBookClick={this.props.onBookClick}/>)

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

    //get extra info on the books (using volume ID as there are too many identifier types e.g. esbn10, esbn13, other etc)
    let bookId = e.target.parentNode.getAttribute('id')
    //let bookQuery =''

    //bookId.includes(':')?bookQuery=`other:${bookId}`:bookQuery=`isbn:${bookId}`
    let id = bookId



    request
     .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
     .then(res => {
       console.log(res.body.volumeInfo)
       let author =''
       if(res.body.volumeInfo.authors!==undefined){
        author = res.body.volumeInfo.authors[0]

       }else{
         author = 'no author'
       }

       let cover = ''
       if(res.body.volumeInfo.imageLinks!==undefined){
        cover = res.body.volumeInfo.imageLinks.smallThumbnail
       }else{
         cover = 'http://d28hgpri8am2if.cloudfront.net/book_images/no_book_cover_hr.jpg'
       }

       this.setState({
         activatedTitle: res.body.volumeInfo.title,
         activatedAuthor: author,
         activatedDesc: res.body.volumeInfo.description,
         activatedCategories: res.body.volumeInfo.categories,
         activatedSubtitle: res.body.volumeInfo.subtitle,
         activatedLink:res.body.volumeInfo.previewLink,
         activatedCover: cover
       })
       console.log(res.body.volumeInfo)
     })
     .catch(err => {
        console.log(err)// err.message, err.response
     });




    this.setState({
      activatedBook: bookId
    })
  }
this.setState ({
    isActive: !this.state.isActive
})
}



findBooks = () => {
  books = [];
  let query = this.state.searchQuery
  let numberOfBooks = 30
  if(query.length!=0 && query!=undefined){
    this.setState({searchQueryLoading: true})
  request
   .get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${numberOfBooks}&filter=ebooks&printType=books&orderBy=relevance`)
   .then(res => {
     console.log(res.body.items)
     /*console.log(res.body.items[0].volumeInfo.industryIdentifiers[0].identifier)//main
     console.log(res.body.items[0].volumeInfo.authors[0])//Authors
     console.log(res.body.items[0].volumeInfo.categories[0])//Main Category
     console.log(res.body.items[0].volumeInfo.imageLinks.smallThumbnail)//cover
     console.log(res.body.items[0].volumeInfo.infoLink)//link to google books
     console.log(res.body.items[0].volumeInfo.previewLink)//preview link to google books
     console.log(res.body.items[0].volumeInfo.publishedDate)
     console.log(res.body.items[0].volumeInfo.title)*/
     //console.log(res.body.items[0].volumeInfo.subtitle)
      // res.body, res.headers, res.status
      for (let i=0; i<numberOfBooks; i++){

      //ensuring fileds exist
      let identifier = ''
      if(res.body.items[i].id!==undefined){
         identifier = res.body.items[i].id
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
           key={i}
           id={identifier}
           title={title}
           subtitle={author}
           size={size}
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

    let description = this.state.activatedDesc
    let noHTMLdescription = description!==undefined?description.replace(/<[^>]+>/g, ''):''
    let cutDescription = noHTMLdescription.substring(0,noHTMLdescription.length/4)
    let fullDescription = noHTMLdescription.substring(0,noHTMLdescription.length)

    return(
      <div className="App">
      <BookPopup
        page = {'search'}
        isActive={this.state.isActive!=false?'is-active':''}
        closeModal={this.closeModal}
        activatedBook={this.state.activatedBook}
        readingClick={this.pushToReading}
        toReadClick={this.pushToRead}
        isLoadingRead={this.state.isLoadingRead!=false?'is-loading':''}
        isLoadingReading={this.state.isLoadingReading!=false?'is-loading':''}

        title = {this.state.activatedTitle}
        cover = {this.state.activatedCover}
        author = {this.state.activatedAuthor}
        description = {this.state.activatedBookReadMore ? fullDescription : cutDescription}

        readMore = {() => { this.setState({activatedBookReadMore: !this.state.activatedBookReadMore})}}
        toggleReadMore = {this.state.activatedBookReadMore}

        link = {this.state.activatedLink}
        subtitle = {this.state.activatedSubtitle}
        category = {this.state.activatedCategories}
        />
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
              ?  <FoundContainerDesktop onDoneClick={this.clickDone} books={books}/>
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
     <Link to="/main">
     <Button  isColor='info' isSize="large" className="customButton" isOutlined onClick={props.onDoneClick}> DONE</Button>
     </Link>
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


 const MediaPopupSearch = ({cover, title, author, category, subtitle, description, readMore, toggleReadMore, link, isLoadingRead, isLoadingReading, readingClick, toReadClick}) => (
  <Columns isMultiline isMobile>
    <Column isSize={12}>
      <Columns>
        <Column>
          <Image isSize='64x64' src={cover} />
        </Column>
        <Column isSize={11} style={{textAlign: 'left'}}>
          <strong>{title}</strong> <small>by {author}</small>
          <br/>
            <small>{category}</small>
        </Column>
      </Columns>
    </Column>

    <Column isSize={12} style={{textAlign: 'justify'}}>
      <strong>{subtitle}</strong>
      <br/>
      <br/>
        <p>
          {description || 'no description'}
          {description != ''  ?
            <a onClick={readMore}> {toggleReadMore!=true ? 'more' : ''}</a>
          : ''}
        </p>
      <br/>

      <a href={link}>Reading Sample</a>
    </Column>

    <Column isSize={12}>
    <Columns>
    <Column isSize={5}>
    <Button isLoading={isLoadingReading} isColor='info' isSize='medium' onClick={readingClick}><p>Add to   <b> READING NOW</b></p></Button>
    </Column>
    <Column/>
    <Column isSize={5}>
    <Button isLoading={isLoadingRead} isColor='warning' isSize='medium' onClick={toReadClick}><p>Add to   <b> READ LATER</b></p></Button>
    </Column>
    </Columns>
    </Column>
  </Columns>
)

const MediaPopupMain =({cover, title, author, isLoadingReading, readingClick}) =>(
  <Columns isMultiline isMobile>


    <Column isSize={12} style={{textAlign: 'center'}}>
       <Field>
          <Label>Hashtags</Label>
          <Control>
              <Input type="text" placeholder='Add hashtags to categorise your books' />
          </Control>
      </Field>
    </Column>

    <Column isSize={12} style={{textAlign: 'center'}}>
      <Field>
         <Label>Comments</Label>
         <Control>
             <TextArea placeholder={'Add thoughts, ideas, quotes and comments from the book'} />
         </Control>
     </Field>
    </Column>

    <Column isSize={12}>
      <Columns>
        <Column isSize={4}>
          <Button isLoading={isLoadingReading} isColor='success' isSize='medium' onClick={readingClick}><b> FINISH BOOK</b></Button>
        </Column>

        <Column isSize={4}>
          <Button isLoading={isLoadingReading} isColor='info' isSize='medium' onClick={readingClick}><b> SAVE</b></Button>
        </Column>

        <Column isSize={4}>
          <Button isOutlined isLoading={isLoadingReading} isColor='danger' isSize='medium' onClick={readingClick}><b> DELETE </b></Button>
        </Column>
      </Columns>

    </Column>
  </Columns>

)



const MediaGroup = (props) => {
  if(props.page === 'search'){
    return (
      <MediaPopupSearch {...props}/>)

  } else {
    return (
      <MediaPopupMain {...props}/>
    )
  }
}

export class BookPopup extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <Modal className = {this.props.isActive}>
        <ModalBackground onClick={this.props.closeModal}/>
        <ModalContent>
        <Box>
        <Columns isCentered isMultiline>
        <Column isSize={12}>
        Book information id:{this.props.activatedBook}
        </Column>

        <Column>
          <MediaGroup {...this.props}/>
        </Column>



        </Columns>
        </Box>
        </ModalContent>
        <ModalClose onClick={this.props.closeModal} />
    </Modal>
    )
  }
}



export default searchBook;
