import React, {Component} from 'react';
import 'bulma/css/bulma.css'
import '../App.css';
import {
  Columns,
  Column,
  Button,
  Title,
  Subtitle,
  Box,
  Progress,
  Select,
  Tag
} from 'bloomer';
import Book from '../Components/book.js'
import {BookPopup, ReadingBooks as addedBooks1, ToReadBooks as addedBooks2} from '../Containers/searchBook.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TIMEFRAME} from '../App.js'
import withAuthorization from '../Components/withAuthorization';
import { db,auth } from '../firebase/index.js';
import AuthUserContext from '../AuthUserContext.js'



let ReadingBooks = [];

let ToReadBooks = [];


      class main extends Component {
        constructor(props){
          super(props)
          this.state = {
            authUserId:'',
            userBooks:'',
            ReadingBooks: '',
            ToReadBooks:'',
            isActive: false,
            activatedBook: '',
            isLoadingReading: false,
            isLoadingRead: false,
            progressValue: '10',
            x: '',
            y: '',
            timeframe: '',
            trackingTitle: TIMEFRAME.toString(),
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
          ReadingBooks = []
          ToReadBooks = []
          //this.loadBooks()
        }

async componentWillMount(){


  if(auth.getCurrentUserId()!=null){
  let user = await auth.getCurrentUserId()
  this.setState({
    authUserId: user.uid
  })



  await db.userBooks(this.state.authUserId).on('value', snap=>{
    let books = snap.val()
    this.setState({
      userBooks: books
    })

if (books!==null&&books!==undefined){


 for(let i=0; i<Object.values(books).length; i++){

   let num = Object.values(books)[i].id
   let title = Object.values(books)[i].title
   let subtitle = Object.values(books)[i].author
   let pic = Object.values(books)[i].cover


   if(Object.values(books)[i].category==='reading'){
     ReadingBooks.push(<Book key={num+title} id={num} title={title} subtitle={subtitle} size={3} cover={pic} onBookClick={this.onMyBookClick}/>)

   }else if(Object.values(books)[i].category==='to read'){
     ToReadBooks.push(<Book key={num+title} id={num} title={title} subtitle={subtitle} size={3} cover={pic} onBookClick={this.onMyBookClick}/>)

   }
 }
}
 this.setState({
   ReadingBooks: ReadingBooks,
   ToReadBooks: ToReadBooks
 })



  })
}






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
    TIMEFRAME.push(`Read ${this.state.x}  in  ${this.state.y}  ${this.state.timeframe} `)
  }
}

closeModal = () =>{
  this.setState({isActive: false})
}

onMyBookClick = (e) =>{
    if(this.state.isActive!==true){

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
 const { users } = this.state;


let title = (
  <Column className="mainHeading" isSize={12}>

  <Title>READ <input id='x' placeholder='  X' className='XandYinput' onChange={this.getInputValue}/> IN <input id='y' placeholder='  Y' className='XandYinput' onChange={this.getInputValue}/>
                      &nbsp;&nbsp;&nbsp;
                      <Select id='timeframe' onChange={this.getInputValue} isSize='medium' style={{}} >
                            <option>Days</option>
                            <option>Weeks</option>
                            <option>Months</option>
                        </Select>
                        &nbsp;&nbsp;&nbsp;
                        <Button isColor='info' isSize="medium" onClick={this.notify} >Track it!</Button>
                      </Title>
                    </Column>)

let trackingTitle = (
  <Column className="mainHeading" isSize={12}>
  <Title>
    {TIMEFRAME.toString()}
    <Tag className="deleteTag"isColor='danger'onClick={()=>alert('this supposed to reset tracker value in db')}>reset</Tag>
  </Title>
  </Column>
)

  return(
    <AuthUserContext.Consumer>
    {authUser =>
    <div className="App">
      <p>{authUser.uid}</p>

      <BookPopup
        isActive={this.state.isActive!==false?'is-active':''}
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


      <Columns isMobile isCentered isMultiline>
          <Column isSize={12}>
              {this.state.trackingTitle.length!==0? trackingTitle : title}
          </Column>

        <Column isSize={12}>
          <Columns  isCentered >
          <ReadingContainer title="READING" progressValue={this.state.progressValue} ReadingBooks={this.state.ReadingBooks}/>
          <ToReadContainer title="TO READ" />
          </Columns>
        </Column>

      </Columns>

    </div>
     }
    </AuthUserContext.Consumer>
  )
}
}

const ToReadContainer = ({title}) => {

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


const ReadingContainer = (props) => {

    return (
      <Column>
        <Progress isSize='medium' isColor='info' style={{marginBottom:'-15px'}} value={45} max={100}/>
        <Box>
          <Subtitle isSize={3}>{props.title}</Subtitle>
          <div className="divider"/>
          <Columns isMobile isMultiline className="foundScrollableDesktop scrollBar">
          {props.ReadingBooks.length===0?'loading':props.ReadingBooks}
          </Columns>
        </Box>
      </Column>
    )
  }

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(main);
