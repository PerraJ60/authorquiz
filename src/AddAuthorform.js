
import React from 'react';
import './AddAuthorform.css';


class AuthorForm extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      name: '',
      imageUrl: '',
      books: [],
      bookTemp: ''
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }
  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value

    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddAuthor(this.state);
  }
  handleAddBook (event){
    this.setState({
      books: this.state.books.concat([this.state.bookTemp]),
      bookTemp : ''
    });

  }
  render () {
    return <form onSubmit={this.handleSubmit}>
    <div className='AddAuthorform_input'>
      <label htmlFor='name'>Name</label>
      <input type='text' name='name' value={this.state.name} placeholder='Name' onChange={this.onFieldChange} />
    </div>
    <div className='AddAuthorform_input'>
      <label htmlFor='imageUrl'>Image Url</label>
      <input type='text' name='imageUrl' value={this.state.imageUrl} placeholder='Image Url' onChange={this.onFieldChange}/>
    </div>
    <div className='AddAuthorform_input'>
      <label htmlFor="bookTemp">Books</label>
      {this.state.books.map((book) =><p key={book}>{book}</p>)}
      <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}/>
      <input type="button" value="+" onClick={this.handleAddBook} />
    </div>
    <button type="submit">Add</button>
  </form>

  }
};

function AddAuthorForm({match, onAddAuthor}){
  return <div className='AddAuthorform'>
    <h1>Add Author!</h1>
      <AuthorForm onAddAuthor={onAddAuthor}/>
  </div>;
}
export default AddAuthorForm;