import { Component } from "react";
import ReactQuill from "react-quill";
import PropTypes from 'prop-types';
import './TextEditor.css';
import 'react-quill/dist/quill.snow.css';

/* 
 * Simple editor component that takes placeholder text as a prop 
 */
class Editor extends Component {
    constructor (props) {
      super(props);
      this.state = { editorHtml: props.html ? props.html :  '', theme: 'snow' }
      this.handleChange = this.handleChange.bind(this);

      if (props.handleChange) {
          this.parentHandler = props.handleChange;
      }
    }
    
    handleChange (html) {
        this.setState({ editorHtml: html });
        this.parentHandler(html);
    }
    
    handleThemeChange (newTheme) {
      if (newTheme === "core") newTheme = null;
      this.setState({ theme: newTheme })
    }
    
    render () {
      return (
          <ReactQuill 
            theme={this.state.theme}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={Editor.modules}
            formats={Editor.formats}
            placeholder={this.props.placeholder}
            className="background-18">
            </ReactQuill>
       )
    }
  }
  
  /* 
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  Editor.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Editor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'color', 'background',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]
  
  /* 
   * PropType validation
   */
  Editor.propTypes = {
    placeholder: PropTypes.string,
  }

  export default Editor;