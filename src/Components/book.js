import React from 'react';
import {Column, Title, Subtitle, Image} from 'bloomer';

const Book = ({title, subtitle}) => (
    <Column isSize={4}>
        <Image isRatio="1:2" src="https://bulma.io/images/placeholders/480x800.png" />
        <Title isSize={5} style={{paddingTop: '15px'}}>{title}</Title>
        <Subtitle isSize={6}>{subtitle}</Subtitle>
    </Column>

);

export default Book;
