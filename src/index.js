import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import './index.css';
//import './bootstrap.min.css'
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import PropTypes from 'prop-types';
import {shuffle, sample} from 'underscore';
import AddAuthorForm from './AddAuthorform.js';
import MouseTracker from './MouseTracker.js';

//import { render } from '@testing-library/react';
import Form from 'react-jsonschema-form';
/*
let model = { clicks: 0 };

function Hello (props){
return <h1>Hello at {props.now}</h1>;
}
function Sum (props){
  return <h1>{props.a} + {props.n} = {props.a + props.n}
  </h1>;
  
}
Sum.propTypes = {
  a: PropTypes.number.isRequired,
  n: PropTypes.number.isRequired
};

//ReactDOM.render( <App clicks = {model.clicks} onClick={()=> { model.clicks++; render()}} />, document.getElementById('root'))
//State
class ClickCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 }
  }
  render() {
    return <div onClick={ ()=>
      { this.setState({clicks: this.state.clicks + 1 });}}>
        this div has been clicked {this.state.clicks} times.
    </div>
  }
}
function Clicker({handleClick}){
  return <div>
            <button onClick={(e)=>{handleClick('A');}}>A</button>
            <button onClick={(e)=>{handleClick('B');}}>B</button>
        </div>
}
function DangerContainer(props){
  return <p> dangerouslySetInnerHTML={props.dangerous} </p>
}
*/

class EvenCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.clickHandler = this.clickHandler.bind(this);
   
  }
  clickHandler(e){
    const clicksNew = this.state.clicks + 1;
    this.setState({clicks: clicksNew});
    if(clicksNew % 2 === 0){
      this.props.onEvenClick(clicksNew);
    }
  }
  render() {
    return <div onClick={this.clickHandler}>
     
        this div has been clicked {this.state.clicks} times.
    </div>
  }
}
const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn', 'Tom Sawyer',
    'Life on the Mississippi', 'Roughing It'
  ]
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/jconrad.png',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness', 'Nostromo', 'Lord Jim']
  },
  {
    name: 'Graham Greene',
    imageUrl: 'images/authors/ggreene.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Brighton Rock', 'The Power and the Glory', 'The Heart of the Matter']
  },
  {
    name: 'James Joyce',
    imageUrl: 'images/authors/jjoyce.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Ulysses', 'Finnegan\'s Wake', 'Dubliners']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/sking.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Shining', 'IT', 'Misery', 'Carrie']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/wshake.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Othello', 'Julius Caesar', 'King Lear']
  }
];
let state = resetState();
 
function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  };
}
function getTurnData (authors) {
  /*Select a set of possible answers*/
  const allBooks = authors.reduce(function (p,c,i) {return p.concat(c.books);}, []);
  const fourRandomBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandomBooks);
  return {
    books: fourRandomBooks,
    author: authors.find((author) => 
        author.books.some((title) => 
           title === answer))
  }
}
function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

class Identity extends React.Component {
  //Forms!
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: ''
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.myDiv = React.createRef();
    //const {default: Form} = Form;
  }
  componentDidMount(){
    this.myDiv.current.innerHTML += "<br/> Set on the wrapped DOM element. <strong>Not safe.</strong>";
  }
  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value

    });
  }
  render() {
    return (
      /*
              <form>
                <input type='text' name='firstName' value={this.state.firstName} placeholder='First name' onChange={this.onFieldChange} />
                <input type='text' name='lastName' value={this.state.lastName} placeholder='Last name' onChange={this.onFieldChange} />
                <button type='submit'>Submit</button>
              </form>
              */
    <div ref={this.myDiv}>{"Set in render <strong>Safe</strong>"}</div>
    );
  }
}

function App () {
  return <AuthorQuiz {...state} 
  onAnswerSelected={onAnswerSelected}
  onContinue={() => {
    state = resetState();
    render();
  }} />;
}
const AuthorWrapper = withRouter(({ history }) => 
  // this wrapper, as a place to specify the onAddAuthor prop!
     <AddAuthorForm onAddAuthor={(author) => {
       authors.push(author);
       history.push('/');
  }}/>
); 

function render() {
ReactDOM.render(
  
  // <Sum a={4} n = {460} />,
  //<Clicker handleClick={(letter) =>{console.log(`${letter} clicked`);}} />,
  //<DangerContainer dangerous="<strong>HELLO</strong>" />,
  //<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}/>,
//<EvenCounter onEvenClick={(d) =>{console.log(`even ${d}`);} }/>,
//<Identity />,

  <BrowserRouter>
   <React.Fragment>
      <Route exact path="/" component= {App} />
      <Route path="/add" component ={AuthorWrapper} />
    </React.Fragment>
  </BrowserRouter>,
  
  document.getElementById('root')
);
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
