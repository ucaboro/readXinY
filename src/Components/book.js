import React, {Component} from 'react';
import {Column, Title, Subtitle, Image, Modal, ModalBackground, ModalContent, ModalClose} from 'bloomer';

export default class Book extends Component{


  render(){
    return(
      <Column id={this.props.id} isSize={this.props.isSize} onClick={this.props.onBookClick}>
          <Image id={this.props.id}  isRatio="4:5" src={this.props.cover} />
          <Title id={this.props.id} isSize={6} style={{paddingTop: '15px'}}>{this.props.title}</Title>
          <Subtitle id={this.props.id} isSize={6}>{this.props.subtitle}</Subtitle>
      </Column>
    )
  }
}
