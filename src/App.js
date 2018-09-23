import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import './App.css';
import login from './Containers/login.js';
import welcome from './Containers/welcome.js';
import searchBook from './Containers/searchBook.js';
import main from './Containers/main.js'
import dnd from './Containers/dndtest.js'
import {Column, Tabs, TabList, TabLink, Tab} from 'bloomer';

import {BrowserRouter,Route, Link} from 'react-router-dom';


class App extends Component {
constructor(){
  super()
  this.state={
    isActive:'isActive'
  }
}

//setting isActive on tab click
handleCheck(e) {
  let new_class = ''
  let tabsNum = document.getElementById('tabs').childNodes.length
  for (let i=0; i<tabsNum;i++){
      document.getElementById('tabs').childNodes[i].setAttribute( 'class', new_class );
  }
  e.target.parentElement.className = 'is-active'
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
              <Tab onClick={this.handleCheck}>
                <Link style={{textDecoration: 'none'}} to='/search'>Search Book</Link>
              </Tab>
              <Tab onClick={this.handleCheck}>
                <Link style={{textDecoration: 'none'}} to='/main'>Main</Link>
              </Tab>
              <Tab onClick={this.handleCheck}>
                <Link style={{textDecoration: 'none'}} to='/dnd'>Drag and Drop</Link>
              </Tab>
            </TabList>
          </Tabs>

          </Column>
          <Route  exact path='/welcome' component={welcome} />
          <Route  exact path='/login' component={login} />
          <Route  exact path='/search' component={searchBook} />
          <Route  exact path='/main' component={main} />
          <Route  exact path='/dnd' component={dnd} />
        </div>
      </BrowserRouter>
    )
}
}

export default App;
