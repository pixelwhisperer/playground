import React, { Component } from 'react';
import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

class CommentBox extends Component {

  constructor() {
    super();
    this.state = {
      showComments: false,
      comments: [
        {id: 1, author: 'Morgan', body: 'Ahoy there!'},
        {id: 2, author: 'Birchwood', body: 'Hello World!'}
      ]
    };
  }

  render(){
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show Comments';



    if (this.state.showComments) {
      commentNodes = <div className="comment-list">{comments}</div>;
      buttonText = 'Hide Comments';
    }

    return(
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />

        <h3>Comments</h3>
        <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        <button onClick={this._handleClick.bind(this)}> {buttonText} </button>

        <ul className="comment-list">
          {commentNodes}
        </ul>
      </div>
    );
  }

  _addComment(author,body) {
    const comment = {
      id: this.state.comments.length + 1, author,body
    };

    this.setState ({
      comments: this.state.comments.concat([comment])
    });
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _getComments(){
   
    return this.state.comments.map((comment)=> {
      return(
        <Comment author={comment.author} body={comment.body} key={comment.id} />
      );
    });
  }

  _getCommentsTitle(commentCount){
    if(commentCount === 0){
      return 'No comments yet';
    } else if(commentCount === 1) {
      return '1 Comment';
    } else {
      return `${commentCount} comments`;
    }
  }
}

class CommentForm extends Component {
  constructor() {
    super();
    this.state = {
      characters: 0
    };
  }
  render(){
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>Join the discussion</label>
        <div className="comment-add-entry">
          <p>New Comment</p>
          <div className="comment-form-fields">
            <input placeholder="Name: " ref={(input)=>this._author = input}/>
            <textarea placeholder="Comments:" ref={(textarea)=>this._body = textarea} onKeyUp={this._getCharacterCount.bind(this)}></textarea>
            <p>{this.state.characters} characters</p>
          </div>
          <div className="comment-form-action">
            <button type="submit">Post Comment</button>
          </div>
        </div>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault(); //makes sure the page doesn't reload when the page is submitted
    let author= this._author;
    let body= this._body;
    this.props.addComment(author.value, body.value);
    this.setState({ characters: 0 });
  }

  _getCharacterCount(){
    this.setState ({
      characters: this._body.value.length
    });
  }
}

class Comment extends Component {
  render() {
    return(
      <li className="comment">
        <p className="comment-header floatleft">{this.props.author}</p>
        <div className="comment-footer floatright">
          <a href="#" className="comment-footer-delete" onClick={this._handleDelete.bind(this)}>
            Delete Comment
          </a>
        </div>
        <hr/>
        <p className="comment-body">
          {this.props.body}
        </p>
        
      </li>
    );
  }

  _handleDelete(e){
    e.preventDefault();
    if(confirm('Are you sure you want to delete this message?')){
      this.props.onDelete(this.props.comment);
    }
  }
}


export default CommentBox;
