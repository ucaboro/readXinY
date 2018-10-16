import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css'
import {Button} from 'bloomer'

export default class RichText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
        this.onChange(newState);
        return 'handled';
    }
    return 'not-handled';
}

onChange = (editorState) => {
   this.setState({
     editorState
   })
 }

 onUnderlineClick = () => {
   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
 }

 onBoldClick = () => {
   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
 }

 onItalicClick = () => {
   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
 }

 onCodeClick = () => {
   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'))
 }

onBlockQuoteClick = () => {
  this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'blockquote'))
}

onBlockCodeClick = () => {
  this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'code-block'))
}

onBlockULClick = (e) => {
    console.log(e.target.parentNode)
  this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'))
}

onBlockHeaderlick = () => {
  this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'header-three'))
}



  render() {
    return (
      <div className="editorContainer">

      <Button onClick={this.onUnderlineClick}>U</Button>
      <Button onClick={this.onBoldClick}><b>B</b></Button>
      <Button onClick={this.onItalicClick}><em>I</em></Button>
      <Button onClick={this.onCodeClick}>code</Button>
      <Button onClick={this.onBlockQuoteClick}>blockquote</Button>
      <Button onClick={this.onBlockCodeClick}>code</Button>
      <Button onClick={this.onBlockULClick}>UL</Button>
      <Button onClick={this.onBlockHeaderlick}>Header</Button>

      <div className="editors">
      <Editor
      blockStyleFn={myBlockStyleFn}
      editorState={this.state.editorState}
      onChange={this.onChange}
      handleKeyCommand={this.handleKeyCommand}
      placeholder="Share thoughts, ideas, quotes and comments for the book.. "
      ref="editor"
      spellCheck={true}
      />
      </div>

      </div>
    );
  }
}

function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return 'customBlockquote';
  }
  if (type === 'code-block') {
    return 'customCode';
  }
  if (type === 'header-three') {
    return 'customHeader';
  }
  if (type === 'unordered-list-item') {
    return 'customUL';
  }
}
