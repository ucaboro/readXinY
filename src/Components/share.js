import React, { Component } from 'react';
import {
Message,
MessageHeader,
MessageBody,
Delete,
Box,
Button,
Columns,
Column
} from 'bloomer';
import posed from 'react-pose';

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
    return(

    <div style={{textAlign: '-webkit-center', height}}>
      <Animate
      pose={this.props.shareActive ? 'end' : 'start'}
      >
      <Message className="shareUrl">
          <MessageHeader>
              <p>Share this link to let people see what you read</p>
              <Delete onClick={this.props.deleteClick} />
          </MessageHeader>
          <MessageBody style={{paddingRight: '50px', backgroundColor:'lightgrey'}}>
          <Columns isMobile>
          <Column isSize={10}>
          <Box>URL TO SHARE </Box>
          </Column>
          <Column isSize={2} style={{alignSelf: 'center'}}>
          <Button isColor='info' isSize="large">Copy</Button>
          </Column>
          </Columns>
          </MessageBody>
      </Message>
    </Animate>
    </div>
    )
  }
}
