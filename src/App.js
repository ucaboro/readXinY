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


import {BrowserRouter,Route, Link} from 'react-router-dom';

export const TIMEFRAME = []

class App extends Component {
constructor(){
  super()
  this.state={
    isActive:'isActive',
    shareActive: false
  }
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
    return(
      <BrowserRouter>
        <div>
          <Column isSize={12}>

          <Tabs isAlign='centered'>
            <TabList id='tabs'>
              <Tab onClick={this.handleCheck}>
                <Link style={{textDecoration: 'none'}} to='/welcome'>Welcome</Link>
              </Tab>
              <Tab  onClick={this.handleCheck}>
                <Link style={{textDecoration: 'none'}} to='/login'>Login</Link>
              </Tab>
              <Tab  onClick={this.handleCheck}>
                <Link style={{textDecoration: 'none'}} to='/signup'>Sign Up</Link>
              </Tab>
              <Tab onClick={this.handleCheck} id="searchTab">
                <Link style={{textDecoration: 'none'}} to='/search'>Search Book</Link>
              </Tab>
              <Tab onClick={this.handleCheck}>
                <Link style={{textDecoration: 'none'}} to='/main'>Main</Link>
              </Tab>
              <Tab onClick={this.handleShareCheck}>
                <a>Share</a>
              </Tab>
            </TabList>
          </Tabs>
          <Share shareActive={this.state.shareActive} deleteClick={this.handleShareCheck}/>

          </Column>
          <Route  exact path='/welcome' component={welcome} />
          <Route  exact path='/login' component={login} />
          <Route  exact path='/signup' component={signup} />
          <Route  exact path='/search' component={searchBook} />
          <Route  exact path='/main' component={main} />
          <Route  exact path='/share' component={Share} />
        </div>
      </BrowserRouter>
    )
}
}

export default App;
