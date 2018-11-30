import React, {Component} from 'react';
import {Column, Title, Subtitle, Image} from 'bloomer';


export default class Book extends Component{


  render(){
    let cover = this.props.cover!==''?this.props.cover: 'http://d28hgpri8am2if.cloudfront.net/book_images/no_book_cover_hr.jpg'
    let trimmedTitle = this.props.title.substring(0, 40)

    return(
      <Column className="book" id={this.props.id} isSize={this.props.isSize} onClick={this.props.onBookClick} onMouseOver={this.props.mouseOver}>
          <Image id={this.props.id} isRatio="4:5" src={cover} />
            <Title id={this.props.id} isSize={6} style={{paddingTop: '15px'}}>{this.props.title.length<=40?this.props.title:trimmedTitle + '..'}</Title>
              <Subtitle id={this.props.id} isSize={6}>{this.props.subtitle}</Subtitle>
      </Column>
    )
  }
}
