import React, { Component } from 'react';
import {
Message,
MessageHeader,
MessageBody,
Delete,
Box,
Button,
Columns,
Column,
Icon
} from 'bloomer';
import posed from 'react-pose';
import {isBrowser} from "react-device-detect";


const Animate = posed.div({
  start: { y: -300, opacity: 0 },
  end: { y: 0, opacity: 1,
  transition: { type: 'spring', stiffness: 1000, stiffness: 200,
  damping: 20 }
 },

});


export default class Share extends Component {

  render(){
    let height = this.props.shareActive ? '100%' : '0'
    let width = isBrowser ? '50%' : '100%'
    return(

    <div style={{textAlign: '-webkit-center', margin: 'auto', height, width}}>
      <Animate
      pose={this.props.shareActive ? 'end' : 'start'}
      >
      <Message className="shareUrl">
          <MessageHeader>
              <p>Share this link to let people see what you read</p>
              <Delete onClick={this.props.deleteClick} />
          </MessageHeader>
          <MessageBody style={{paddingRight: '50px', backgroundColor:'lightgrey'}}>
          <Columns isMobile isMultiline>
          <Column isSize={10}>
          <Box className="shareUrl"> <p>URL TO SHARE</p> </Box>
          </Column>
          <Column isSize={2} style={{alignSelf: 'center'}}>
          <Button className="shareBtn"isColor='info' isSize="large"><Icon className="far fa-clone " /></Button>
          </Column>
          </Columns>
          </MessageBody>
      </Message>
    </Animate>
    </div>
    )
  }
}
