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
import {convertToRaw} from 'draft-js';




let ReadingBooks = [];

let ToReadBooks = [];

//to push hashtags as a strings in the db
let hashstrings = [];


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
            activatedBookComments:'',
            activatedHashtags:''

          }
          //this.getBookInfo = this.getBookInfo.bind(this)
          //this.pushToReading = this.pushToReading.bind(this)
          //this.pushToRead = this.pushToRead.bind(this)
          this.getInputValue = this.getInputValue.bind(this)
          this.notify = this.notify.bind(this)
          this.onMyBookClick = this.onMyBookClick.bind(this)
          //this.loadBooks()

        }



async componentWillMount(){
  console.log(this.state)
//resetting books
ReadingBooks = []
ToReadBooks = []


  if(auth.getCurrentUserId()!=null){
  let user = await auth.getCurrentUserId()
  this.setState({
    authUserId: user.uid
  })


await db.getTrackers(this.state.authUserId).on('value', snap=>{
  if (snap.val()!=undefined){
    let title = Object.values(snap.val()).toString()
      this.setState({
          trackingTitle: title
      })
    }
})


await db.userBooks(this.state.authUserId).on('value', snap=>{
  let books = snap.val()
    this.setState({
      userBooks: books
    })

if (books!==null&&books!==undefined){
  ReadingBooks =[]
  ToReadBooks =[]
 for(let i=0; i<Object.values(books).length; i++){

   let num = Object.values(books)[i].id
   let title = Object.values(books)[i].title
   let subtitle = Object.values(books)[i].author
   let pic = Object.values(books)[i].cover


   if(Object.values(books)[i].category==='reading'){
     ReadingBooks.push(<Book key={num+title} id={num} title={title} subtitle={subtitle} isSize={3} cover={pic} onBookClick={this.onMyBookClick}/>)

   }else if(Object.values(books)[i].category==='to read'){
     ToReadBooks.push(<Book key={num+title} id={num} title={title} subtitle={subtitle} isSize={3} cover={pic} onBookClick={this.onMyBookClick}/>)

   }
 }
}
 this.setState({
   ReadingBooks: ReadingBooks,
   ToReadBooks: ToReadBooks,
 })
})

}//if user signed in
}


booksMouseOver = (e) =>{
//document.getElementById(e.target.id).childNodes[0].childNodes[0].src='https://i.pinimg.com/originals/20/9f/86/209f863c17aeb880eabeded4f93aa541.png'

}

setUserIdState = () =>{

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
    db.setTracker(this.state.authUserId, TIMEFRAME)
  }
}

resetTracker = () => {
  db.resetTracker(this.state.authUserId,this.state.trackingTitle)
  this.setState({trackingTitle: ''})
}

deleteTracker = () => {
 db.deleteCurrentTracker(this.state.authUserId)
 this.setState({trackingTitle: ''})
}

closeModal = () =>{
  this.setState({isActive: false, activatedHashtags: '', hashstrings:''})
  hashstrings=[]
}

 onMyBookClick(e){
    if(this.state.isActive!==true){
      let bookId = e.target.parentNode.getAttribute('id')
      this.setState({isActive: !this.state.isActive, activatedBook: bookId, activatedHashtags: this.findBookHashtags(bookId)})

      let firebaseKey = this.findBookFirebaseIdByBookId(bookId)
      let k = this.findBookComment(bookId)

    }
}

 findBookFirebaseIdByBookId = (bookId) => {
  let booksLength = Object.values(this.state.userBooks).length
  for (let i=0; i<booksLength; i++){

    if (Object.values(this.state.userBooks)[i].id === bookId){
      return Object.keys(this.state.userBooks)[i]
    }
  }
}

findBookComment = (bookId) =>{
  let firebaseBookId = this.findBookFirebaseIdByBookId(bookId)
  //console.log(this.state.userBooks[firebaseBookId]);
  return this.state.userBooks[firebaseBookId].comment
}

findBookHashtags = (bookId) =>{
  let firebaseBookId = this.findBookFirebaseIdByBookId(bookId)
  if (this.state.userBooks[firebaseBookId].hashtags && this.state.userBooks[firebaseBookId].hashtags!='undefined'){
  let tags = []
  for (let i=0; i<this.state.userBooks[firebaseBookId].hashtags.length; i++){
    tags.push(<Tag className="hashtags" style={{marginRight: '5px'}} key={i} isColor='info'>{this.state.userBooks[firebaseBookId].hashtags[i]}</Tag>)
    hashstrings[i] = this.state.userBooks[firebaseBookId].hashtags[i]
  }

  return tags;
} else{
  return this.state.activatedHashtags
}
}


saveChanges = () => {
let fbId = this.findBookFirebaseIdByBookId(this.state.activatedBook)
    const content = window.localStorage.getItem('content');
    db.pushBookCommentAndHashtags(this.state.authUserId, fbId, content, hashstrings)
    this.closeModal()
    window.localStorage.removeItem('content');
}




deleteBook = () => {

  ReadingBooks =[]
  ToReadBooks =[]
  //this.resetReadingStates()
  db.deleteBookById(this.state.authUserId, this.state.activatedBook)
  this.setState({
    isActive: false
  })
}

resetReadingStates = () =>{
  console.log('reset')
  this.setState({
    ReadingBooks: '',
    ToReadBooks:'',
    userBooks: ''
  })
}

onEnterTagClick = (event) =>{

  let code = event.keyCode || event.which;
    if(code === 13) { //13 is the enter keycode

        let oldTags = this.state.activatedHashtags
         let newTag = <Tag className="hashtags" style={{marginRight: '5px'}} key={event.target.value} isColor='info'>#{event.target.value}</Tag>

            this.setState({
              activatedHashtags:[...oldTags, newTag]
            })

            hashstrings.push('#'+event.target.value)
            event.target.value=''

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
    {this.state.trackingTitle.toString()}
    <Tag className="resetTag"isColor='danger'onClick={this.resetTracker}>reset</Tag>
  </Title>
  </Column>
)

let BookPopupActivated = (
  <BookPopup
    isActive={this.state.isActive!==false?'is-active':''}
    closeModal={this.closeModal}
    activatedBook={this.state.activatedBook}
    title = {this.state.activatedTitle}
    cover = {this.state.activatedCover}
    author = {this.state.activatedAuthor}
    page = "main"
    deleteBook ={this.deleteBook}
    saveChanges={this.saveChanges}
    addTag={this.onEnterTagClick}
    hashtags={this.state.activatedHashtags}
    comment = {this.state.isActive!==false?this.findBookComment(this.state.activatedBook):'not active comment'}
    uid = {this.state.authUserId}
    bookId = {this.state.activatedBook}
    />
)

  return(

    <AuthUserContext.Consumer>
    {authUser =>
    <div className="App">
      <p>{authUser.uid}</p>

      {this.state.isActive?BookPopupActivated:''}

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
          <ToReadContainer title="TO READ" ToReadBooks={this.state.ToReadBooks}/>
          </Columns>
        </Column>

      </Columns>

    </div>
     }
    </AuthUserContext.Consumer>
  )
}
}

const ToReadContainer = ({title, ToReadBooks}) => {

    return (
      <Column>
        <Box>
          <Subtitle isSize={3}>{title}</Subtitle>
          <div className="divider"/>
            <Columns isMobile isMultiline className="foundScrollableDesktop scrollBar">
            {ToReadBooks.length===0?'loading':ToReadBooks}
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
          <Columns isMobile isMultiline className="foundScrollableDesktop scrollBar is-variable is-3-tablet is-4-desktop is-5-widescreen">
          {props.ReadingBooks.length===0?'loading':props.ReadingBooks}
          </Columns>
        </Box>
      </Column>
    )
  }

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(main);
