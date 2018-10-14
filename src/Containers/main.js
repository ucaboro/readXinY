import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import '../App.css';
import {Columns, Column, Button,
        Title, Subtitle, Field,
        Control, Input, Box,
        Modal, ModalBackground, ModalContent,
        ModalClose, Media, MediaLeft, MediaRight,
        MediaContent, Icon, Image, Content, Level,
        Delete, LevelLeft, LevelItem, Progress, Select, Notification} from 'bloomer';
import Book from '../Components/book.js'
import {BookPopup, MediaPopup, ReadingBooks as addedBooks1, ToReadBooks as addedBooks2} from '../Containers/searchBook.js'
import {
        BrowserView,
        MobileView,
        isBrowser,
        isMobile
      } from "react-device-detect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




let ReadingBooks = [];

let ToReadBooks = [];

      export default class main extends Component {
        constructor(props){
          super(props)
          this.state = {
            isActive: false,
            activatedBook: '',
            isLoadingReading: false,
            isLoadingRead: false,
            progressValue: '10',
            x: '',
            y: '',
            timeframe: '',
            trackingTitle: '',
            activatedBookTitle: '',
            activatedBookAuthor:'',
            activatedCover: '',
            activatedBookHashtags: '',
            activatedBookComments:''
          }
          //this.getBookInfo = this.getBookInfo.bind(this)
          //this.pushToReading = this.pushToReading.bind(this)
          //this.pushToRead = this.pushToRead.bind(this)
          this.getInputValue = this.getInputValue.bind(this)
          this.notify = this.notify.bind(this)

          //this.loadBooks()

        }

componentWillMount(){

   ReadingBooks = addedBooks1.map((i) =>
   <Book id={i.props.id} key={i.key} title={i.props.title} subtitle={i.props.subtitle} isSize={4} onBookClick={this.onMyBookClick} cover={i.props.cover} style={{backgroundColor:'blue'}}/>
 );

 ToReadBooks = addedBooks2.map((i) =>
 <Book id={i.props.id} key={i.key} title={i.props.title} subtitle={i.props.subtitle} isSize={4} onBookClick={this.onMyBookClick} cover={i.props.cover} style={{backgroundColor:'blue'}}/>
);


}

booksMouseOver = (e) =>{
//document.getElementById(e.target.id).childNodes[0].childNodes[0].src='https://i.pinimg.com/originals/20/9f/86/209f863c17aeb880eabeded4f93aa541.png'

}

bookFinished = () =>{

}

getInputValue = () =>{
  this.setState({
    x:document.getElementById('x').value,
    y:document.getElementById('y').value,
    timeframe: document.getElementById('timeframe').value
  })
}

notify = () => {
  if(this.state.x.length!==0 && this.state.y.length !== 0){
    toast.info("👍🏻 Tracker set successfully!", {draggablePercent: 60, position: toast.POSITION.TOP_LEFT});
    this.setState({
      trackingTitle: `Read ${this.state.x}  in  ${this.state.y}  ${this.state.timeframe} `
    })
  }
}

closeModal = () =>{
  this.setState({isActive: false})
}

onMyBookClick = (e) =>{
    if(this.state.isActive!=true){

      let bookId = e.target.parentNode.getAttribute('id')
      this.setState({isActive: !this.state.isActive, activatedBook: bookId})
    }
}


loadBooks = () =>{
  for (let i=1; i<17; i++){
    ReadingBooks.push( <Book mouseOver={this.booksMouseOver} key={i} id={i} title={'title' + i} subtitle={'subtitle'+i} isSize={4} onBookClick={this.onMyBookClick} cover='' style={{backgroundColor:'blue'}}/> )
   }

   for (let n=0; n<3; n++){
     ToReadBooks.push( <Book key={n} id={n} title={'title' + n} subtitle={'subtitle'+n} isSize={4} onBookClick={this.onMyBookClick} cover=''/> )
    }
}





render(){


let title = (            <Title>READ <input id='x' placeholder='  X' className='XandYinput' onChange={this.getInputValue}/> IN <input id='y' placeholder='  Y' className='XandYinput' onChange={this.getInputValue}/>
                      &nbsp;&nbsp;&nbsp;
                      <Select id='timeframe' onChange={this.getInputValue} isSize='medium' style={{}} >
                            <option>Days</option>
                            <option>Weeks</option>
                            <option>Months</option>
                        </Select>
                        &nbsp;&nbsp;&nbsp;
                        <Button isColor='info' isSize="medium" onClick={this.notify} >Track it!</Button>
                      </Title>)

let trackingTitle = (
  <Title>
    {this.state.trackingTitle}
  </Title>
)

  return(
    <div className="App">

      <BookPopup
        isActive={this.state.isActive!=false?'is-active':''}
        closeModal={this.closeModal}
        activatedBook={this.state.activatedBook}
        title = {this.state.activatedTitle}
        cover = {this.state.activatedCover}
        author = {this.state.activatedAuthor}
        page = "main"
        />

      <div>
          <ToastContainer draggablePercent={60} autoClose={2500} />
      </div>


      <Columns isCentered isMultiline  >
          <Column isSize={12}>
              {this.state.trackingTitle.length!=0? trackingTitle : title}
          </Column>

        <Column>
          <Columns isCentered >
          <ReadingContainer title="READING" progressValue={this.state.progressValue} ReadingBooks={ReadingBooks}/>
          <ToReadContainer title="TO READ" />
          </Columns>
        </Column>

      </Columns>

    </div>
  )
}
}

const ReadingContainer = (props) => {
  if (isBrowser){
    return (
      <Column>
        <Progress isSize='medium' isColor='info' style={{marginBottom:'-15px'}} value={props.progressValue} max={100}/>
        <Box>
          <Subtitle isSize={3}>{props.title}</Subtitle>
          <div className="divider"/>
          <Columns isMobile isMultiline className="foundScrollableDesktop scrollBar">
          {props.ReadingBooks}
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
