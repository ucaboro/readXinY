import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import './App.css';
import login from './Components/Login';
import signup from './Containers/SignUp';
import welcome from './Containers/welcome.js';
import searchBook from './Containers/searchBook.js';
import main from './Containers/main.js'
import Share from './Components/share.js'
import {Column, Tabs, TabList, Tab} from 'bloomer';
import { auth, firebase } from './firebase/index.js';
import AuthUserContext from './AuthUserContext';



import {BrowserRouter,Route, Link} from 'react-router-dom';

export const TIMEFRAME = []

class App extends Component {
constructor(){
  super()
  this.state={
    isActive:'isActive',
    shareActive: false,
    authUser: null
  }
}

componentDidMount() {
  firebase.auth.onAuthStateChanged(authUser => {
    authUser
      ? this.setState({ authUser })
      : this.setState({ authUser: null });
  });
}

//setting isActive on tab click
handleCheck(e) {
  let new_class = ` `
  let tabsNum = document.getElementById('tabs').childNodes.length
  for (let i=0; i<tabsNum;i++){
      document.getElementById('tabs').childNodes[i].setAttribute( 'class', new_class );
  }
  e.target.parentElement.className = 'is-active'
}

handleShareCheck = () =>{
  this.setState({
    shareActive: !this.state.shareActive
  })
  console.log('set from App.js to: ' + this.state.shareActive)
}

  render() {
    const { authUser } = this.state;
    return(
      <AuthUserContext.Provider value={authUser}>
      <BrowserRouter>
        <div>
          <Column isSize={12}>
            <Navigation authUser={this.state.authUser} handleCheck={this.handleCheck} handleShareCheck={this.handleShareCheck}/>
          <Share shareActive={this.state.shareActive} deleteClick={this.handleShareCheck}/>

          </Column>
          <Route  exact path='/welcome' component={welcome} />
          <Route  exact path='/login' component={login} />
          <Route  exact path='/signup' component={signup} />
          <Route  exact path='/search' component={searchBook} />
          <Route  path='/main' component={main} />
          <Route  exact path='/share' component={Share} />
        </div>
      </BrowserRouter>
      </AuthUserContext.Provider>
    )
}
}

const Navigation = ({ authUser, handleCheck, handleShareCheck }) =>
  <AuthUserContext.Consumer>
    { authUser => authUser
        ? <NavigationAuth user={authUser} handleCheck={handleCheck} handleShareCheck={handleShareCheck}/>
        : <NavigationNonAuth handleCheck={handleCheck} />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = (props) =>
<div>
<Tabs isAlign='centered'>
  <TabList id='tabs'>
    <Tab isActive={'fasle'}>
      {props.user.email}
    </Tab>
    <Tab onClick={props.handleCheck}>
      <Link style={{textDecoration: 'none'}} to='/welcome'>Welcome</Link>
    </Tab>
    <Tab onClick={props.handleCheck} id="searchTab">
      <Link style={{textDecoration: 'none'}} to='/search'>Search Book</Link>
    </Tab>
    <Tab onClick={props.handleCheck} id="mainTab">
      <Link style={{textDecoration: 'none'}} to={`/main/${props.user.uid}`}>Main</Link>
    </Tab>
    <Tab onClick={props.handleShareCheck}>
      <a>Share</a>
    </Tab>
    <Tab onClick={auth.doSignOut}>
      <Link style={{textDecoration: 'none'}} to='/login'>Log Out</Link>
    </Tab>
  </TabList>
</Tabs>
</div>


const NavigationNonAuth = (props) =>
<Tabs isAlign='centered'>
  <TabList id='tabs'>
    <Tab onClick={props.handleCheck}>
      <Link style={{textDecoration: 'none'}} to='/welcome'>Welcome</Link>
    </Tab>
    <Tab  onClick={props.handleCheck}>
      <Link style={{textDecoration: 'none'}} to='/login'>Login</Link>
    </Tab>
    <Tab  onClick={props.handleCheck}>
      <Link style={{textDecoration: 'none'}} to='/signup'>Sign Up</Link>
    </Tab>
    <Tab onClick={props.handleCheck} id="searchTab">
      <Link style={{textDecoration: 'none'}} to='/search'>Search Book</Link>
    </Tab>
  </TabList>
</Tabs>

export default App;
