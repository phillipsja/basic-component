import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//https://medium.freecodecamp.org/all-the-fundamental-react-js-concepts-jammed-into-this-single-medium-article-c83f9b53eac2
function Button1 (props) {
  // Returns a DOM element here. For example:
  return <button type="submit">{props.label}</button>; //the curly syntax is part of JSX, not very robust? 
}

function Button2 (props) { //this is a rewrite not using JSX
  return React.createElement(
    "button",
    { type: "submit" },
    props.label
  );
}
//eg 3
const InputForm1 = React.createElement(
  "form",
  { target: "_blank", action: "https://google.com/search" },
  React.createElement("div", null, "Enter input and click Search"),
  React.createElement("input", { name: "q", className: "input" }),
  React.createElement(Button3, { label: "Search" })
);
// InputForm uses the Button component, so we need that too:
function Button3 (props) {
  return React.createElement(
    "button",
    { type: "submit" },
    props.label
  );
}
//eg 4
//note that this is not "html" it's JSX, note "className" instead of "class". 
//this is considered javascript, note the semi-colon at the end of the html-like string (jsx)
const InputForm2 =
  <form target="_blank" action="https://google.com/search">
    <div>Enter input and click Search</div>
    <input name="q" className="input" />
    <Button label="Search" />
  </form>;
// InputForm "still" uses the Button component, so we need that too.
// Either JSX or normal form would do
function Button (props) {
  // Returns a DOM element here. For example:
  return <button type="submit">{props.label}</button>;
}
// Then we can use InputForm directly with .render

// Example 5 -  Using JavaScript expressions in JSX
const RandomValue = () => 
  <div>
    { Math.floor(Math.random() * 100) }
  </div>;
	
// Example 6 - An object passed to the special React style prop
const ErrorDisplay1 = ({message}) =>
  <div style={ { color: 'red', backgroundColor: 'yellow' } }> //We use an object as the value of the style attribute. 
    {message}
  </div>;
	
// Example 7 - Using a React element within {}
const MaybeError = ({errorMessage}) =>
  <div>
    {errorMessage && <ErrorDisplay1 message={errorMessage} />}
  </div>;
  
// The MaybeError component uses the ErrorDisplay component:
const ErrorDisplay2 = ({message}) =>
  <div style={ { color: 'red', backgroundColor: 'yellow' } }>
    {message}
  </div>;
	
// Example 8 - Using an array map inside {}
const Doubler = ({value=[1, 2, 3]}) =>
  <div>
    {value.map(e => e * 2)}
  </div>;

// Example 9 - Creating components using JavaScript classes
// class syntax vs component syntax
class Button4 extends React.Component {
  render() {
    return <button>{this.props.label}</button>;
  }
}

// Example 10 -  Customizing a component instance
class Button5 extends React.Component {
  constructor(props) {
    super(props);
    this.id = Date.now();
  }
  render() {
    return <button id={this.id}>{this.props.label}</button>;
  }
}

// Example 11 — Using class properties, even functions
class Button6 extends React.Component {

	clickCounter = 0;		
  handleClick = () => {
    console.log(`Clicked: ${++this.clickCounter}`);
  };
  
  render() {
    return (
      <button id={this.id} onClick={this.handleClick}> //When we specified the handleClick function as the value of the special onClick React attribute, we did not call it. We passed in the reference to the handleClick function. Calling the function on that level is one of the most common mistakes when working with React.i.e. // Wrong:onClick={this.handleClick()}
        {this.props.label}
      </button>
    );
  }
}

// Example 12 - Working with wrapped events
// https://jscomplete.com/repl?j=HkIhRoKBb
class Form2 extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// Example 13 -  the setState API
// https://jscomplete.com/repl?j=H1fek2KH-
class CounterButton extends React.Component {
  state = {
    clickCounter: 0,
    currentTimestamp: new Date(),
  };
  
  handleClick = () => {
    this.setState((prevState) => {
     return { clickCounter: prevState.clickCounter + 1 };
    });
  };
  
  componentDidMount() {
   setInterval(() => {
     this.setState({ currentTimestamp: new Date() })
    }, 1000);
  }
  
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
        <p>Clicked: {this.state.clickCounter}</p>
        <p>Time: {this.state.currentTimestamp.toLocaleString()}</p>
      </div>
    );
  }
}
/*
***************************************************************************************
*/

//Next tutorial: 
//https://reactjs.org/docs/hello-world.html

//JSX
// const element = <h1>Hello, world!</h1>;
// the above is neither a string, nor HTML, it is a javascript extension called "JSX"
//eg 1
const name = 'Josh Perez';
const element1 = <h1>Hello, {name}</h1>; //any valid .js expression can be put between the curly braces.

//ReactDOM.render(
//  element1,
//  document.getElementById('root')
//);

//eg 2
// you can put the result of a function call in between the curly braces
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element2 = ( //note the jsx can be split over multiple lines to prevent semi-colon insertion
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

//ReactDOM.render(
//  element2,
//  document.getElementById('root')
//);

//Babel compiles JSX down to React.createElement() calls.

//the following two calls are identical

const element3 = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element4 = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

//ReactDOM.render(
//  element4,
//  document.getElementById('root')
//);

//note that element 4 is the simplified version of this: 
// (although this doesn't actually compile!
//const element5 = {
//  type: 'h1',
//  props: {
//    className: 'greeting',
//    children: 'Hello, world!'
//  }
//};

//Rendering Elements

//* Don't confuse element with components
// -- components consist of elements

const element6 = <h1>Hello, world</h1>;
//ReactDOM.render(element6, document.getElementById('root'));


//Updating a rendered element
//* React elements are immutable

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

//setInterval(tick, 1000);

/* 
In practice, most React apps only call ReactDOM.render() once. 
In the next sections we will learn how such code gets encapsulated 
into stateful components.
*/

//Component API reference: 
//https://reactjs.org/docs/react-component.html

//* components are like .js functions
// a functional component
function Welcome1(props) { //<-- accepts a single "props" object argument
  return <h1>Hello, {props.name}</h1>;//<-- returns a react element (jsx)
}

//ReactDOM.render(<Welcome1 name="Joe" />, document.getElementById('root'));

// you can also use an es6 class to define a component
// components always begin with a capital letter
// React treats components starting with lowercase letters as DOM tags
// classes have some additional features (e.g. "state")
class Welcome2 extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
//ReactDOM.render(<Welcome2 name="Bob" />, document.getElementById('root'));

//Elements can also be user-defined (seen above)
//When React sees an element representing a user-defined component, 
//it passes JSX attributes (e.g. {name="Sara"}) to this component as a single object. 
//We call this object “props”.
function Welcome3(props) { //<-- accepts a single "props" object argument
  return <h1>Hello, {JSON.stringify(props)}</h1>;//<-- returns a react element (jsx)
}
const element7 = <Welcome3 name="Sara" />; //remember, Welcome3 is (functional) component
	
//ReactDOM.render(
//  element7,
//  document.getElementById('root')
//);

//Composing components
function Welcome4(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App2() { //Typically, new React apps have a single App component at the very top.
  return (
    <div>
      <Welcome4 name="Sara" />
      <Welcome4 name="Cahal" />
      <Welcome4 name="Edite" />
    </div>
  );
}

//ReactDOM.render(
//  <App2 />,
//  document.getElementById('root')
//);

//Extracting components

//consider the following component
function Comment(props) {

  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

function formatDate(date)
{
	return date.toLocaleDateString();
}

const info1 = {
	date: new Date(), 
	text: 'I hope you enjoy learning React!',
	author: {
		name: 'Harper',
		avatarUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' 
	},
};

//ReactDOM.render(
//  <Comment author = {info1.author} date={info1.date} text={info1.text} />, //it seems lame that you can't just pass in {info}
//  document.getElementById('root')
//);



//Let's extract avatar

function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />

  );
}

//simplify 'Comment' element
function Comment2(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

//Now UserInfo
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

//Comment then becomes: 
function Comment3(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

const info2 = {
	date: new Date(), 
	text: 'I hope you enjoy learning React!',
	author: {
		name: 'Harper',
		avatarUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' 
	},
};

//ReactDOM.render(
//  <Comment3 author = {info2.author} text={info2.text} date={info2.date} />, //it seems lame that you can't just pass in {info}
//  document.getElementById('root')
//);


//All React components must act like pure functions with respect to their props.

//pure
function sum(a, b) {
  return a + b;
}
//impure
function withdraw(account, amount) {
  account.total -= amount; //<-- changes its own inputs
}

//react components change through "state"

//consider previous example: 
//We have only learned one way to update the UI. We call ReactDOM.render()
function tick2() {
  const element8 = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element8,
    document.getElementById('root')
  );
}

//setInterval(tick2, 1000);

//refactor so that time is a property of a clock

function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick3() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

//setInterval(tick3, 1000);


//but really the setInterval should be encapsulated in the Clock...
//To implement this, we need to add “state” (using an es6 class) to the Clock component.

class Clock2 extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2> //note we added the "this" keyword in front of props
      </div>
    );
  }
}

//But we need more, we are going to store time in the private state class

class Clock3 extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

//Next we need to add a class constructor to assign the initial state: 

class Clock4 extends React.Component {
  constructor(props) {
    super(props); //Class components should always call the base constructor with props.
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

//ReactDOM.render(
//  <Clock4 />, //now, no props, but clock doesn't update. we need lifecycle hooks? 
//  document.getElementById('root')
//);

//We want to set up a timer whenever the Clock is rendered to the DOM for the first time. 
//This is called “mounting” in React.

//We also want to clear that timer whenever the DOM produced by the Clock is removed. 
//This is called “unmounting” in React.

//We can declare special methods on the component class to run some code when 
//a component mounts and unmounts:

class Clock5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() { //The componentDidMount() hook runs after the component output has been rendered to the DOM. This is a good place to set up a timer:
		this.timerID = setInterval(() => this.tick(),1000);
  }

  componentWillUnmount() { //We will tear down the timer in the componentWillUnmount() lifecycle hook:
	  clearInterval(this.timerID) //this.timerID is private to the class; this allows the setInterval in the browser to be clearedif the clock is removed
  }
	
	tick() { 
    this.setState({ //Finally, we will implement a method called tick() that the Clock component will run every second.
			//It will use this.setState() to schedule updates to the component local state:
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

//ReactDOM.render(
//  <Clock5 />, //now, no props, but clock doesn't update. we need lifecycle hooks? 
//  document.getElementById('root')
//);


//Don't modify state directly: 
// Wrong
//this.state.comment = 'Hello';
// Correct
//this.setState({comment: 'Hello'});

//The only place where you can assign this.state is the constructor.

//States may be async
//Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.

// Wrong
//this.setState({
//  counter: this.state.counter + this.props.increment,
//});

//To fix it, use a second form of setState() that accepts a function rather than an object. 
//That function will receive the previous state as the first argument, and the props at the 
//time the update is applied as the second argument:
// Correct
//this.setState((prevState, props) => ({
//  counter: prevState.counter + props.increment
//}));


//Here's the non-arrow function version: 
// Correct
//this.setState(function(prevState, props) {
//  return {
//    counter: prevState.counter + props.increment
//  };
//});


//States are merged, so you only have to update what has changed: 
//  constructor(props) {
//    super(props);
//    this.state = {
//      posts: [],
//      comments: []
//    };
//  }

//Then you can update them independently with separate setState() calls:

//componentDidMount() {
//  fetchPosts().then(response => {
//    this.setState({
//      posts: response.posts
//    });
//  });
//
//  fetchComments().then(response => {
//    this.setState({
//      comments: response.comments
//    });
//  });
//}


//state is private
//This is why state is often called local or encapsulated. 
//It is not accessible to any component other than the one that owns and sets it.
//However, a component may choose to pass its state down as props to its child components, 
//by passing a prop from this.state, e.g. 
//<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//This also works for user defined components: 
//<FormattedDate date={this.state.date} />


//Events

//You pass a function as event handler rather than a string
//You have to explicitly call e.preventDefault() to cancel default behavior
//Consider the default behavior a link click opening a new page: 

/* 
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
*/

// In react: 
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}

//ReactDOM.render(
//  <ActionLink />, //now, no props, but clock doesn't update. we need lifecycle hooks? 
//  document.getElementById('root')
//);

//When using React you should generally not need to call addEventListener to add listeners to a DOM element after it is created. 
//Instead, just provide a listener when the element is initially rendered.

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

//ReactDOM.render(
//  <Toggle />,
//  document.getElementById('root')
//);

//Being careful about `this` by using "class fields syntax"  <- (⊙.☉) 

//Conditional Rendering

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

//ReactDOM.render(
//  // Try changing to isLoggedIn={true}:
//  <Greeting isLoggedIn={false} />,
//  document.getElementById('root')
//);

//More advanced example using state: 

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

//ReactDOM.render(
//  <LoginControl />,
//  document.getElementById('root')
//);

//Using conditional operator and returning null

function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

//ReactDOM.render(
//  <Page />,
//  document.getElementById('root')
//);


//Lists & Keys
const numbers1 = [1, 2, 3, 4, 5];
const listItems = numbers1.map((number) =>
  <li>{number}</li>
);

//ReactDOM.render(
//  <ul>{listItems}</ul>,
//  document.getElementById('root')
//);

//refactored into component

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers2 = [1, 2, 3, 4, 5];
//ReactDOM.render(
//  <NumberList numbers={numbers2} />,
//  document.getElementById('root')
//);

//Assigning a key to list items to make react happy

function NumberList2(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers3 = [1, 2, 3, 4, 5];
//ReactDOM.render(
//  <NumberList2 numbers={numbers3} />,
//  document.getElementById('root')
//);

//Use keys from your data when you can: 
const todos1 = ['get a job', 'move out-of-state', 'go-for-a-ride'];
const todoItems1 = todos1.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);


//Or index # as last resort: 
const todos2 = ['get a job', 'move out-of-state', 'go-for-a-ride'];
const todoItems2 = todos2.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}> //it is not good practice to keep the key on the list item
    {todo.text}
  </li>
);

function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList1(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers4 = [1, 2, 3, 4, 5];
//ReactDOM.render(
//  <NumberList1 numbers={numbers4} />,
//  document.getElementById('root')
//);


//keys only need be unique amongst siblings
function Blog1(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts1 = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
//ReactDOM.render(
//  <Blog1 posts={posts1} />,
//  document.getElementById('root')
//);

//note so far these keys don't show up in the dom
//if you need them

//inlining the map function

function NumberList2(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />

      )}
    </ul>
  );
}

//Controlled Components

//input area form
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

//ReactDOM.render(
//  <NameForm />,
//  document.getElementById('root')
//);

//text area form
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

//ReactDOM.render(
//  <EssayForm />,
//  document.getElementById('root')
//);

//select list form
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <FlavorForm />,
  document.getElementById('root')
);

//Handling multiple inputs
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

//ReactDOM.render(
//  <Reservation />,
//  document.getElementById('root')
//);


//Lifting state for components that can share state

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />

        <BoilingVerdict
          celsius={parseFloat(temperature)} />

      </fieldset>
    );
  }
}

//ReactDOM.render(
//<Calculator />,
//document.getElementById('root')
//)

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator2 extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}

//ReactDOM.render(
//<Calculator2 />,
//document.getElementById('root')
//)

const scaleNames2 = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict2(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames2[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator3 extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput2
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />

        <TemperatureInput2
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />

        <BoilingVerdict2
          celsius={parseFloat(celsius)} />

      </div>
    );
  }
}
//ReactDOM.render(
//<Calculator3 />,
//document.getElementById('root')
//)


//Composition vs Inheritance
/* <-- note the special children attribute */
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children} 
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}

//ReactDOM.render(
//<WelcomeDialog />,
//document.getElementById('root')
//)

//This represents a multi-use variation: 

function Contacts() {
  return <div className="Contacts" />;
}

function Chat() {
  return <div className="Chat" />;
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
				<div>Not showing the lighblue bg color for some reason</div>
      </div>
      <div className="SplitPane-right">
        {props.right}
				<div>right</div>
      </div>
    </div>
  );
}

function App2() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}

//ReactDOM.render(
//  <App2 />,
//  document.getElementById('root')
//);

function FancyBorder2(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog2(props) {
  return (
    <FancyBorder2 color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder2>
  );
}

function WelcomeDialog2() {
  return (
    <Dialog2
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}

//ReactDOM.render(
//  <WelcomeDialog2 />,
//  document.getElementById('root')
//);

//Composition using classes

function FancyBorder3(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog3(props) {
  return (
    <FancyBorder3 color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder3>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog3 title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog3>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}

//ReactDOM.render(
//  <SignUpDialog />,
//  document.getElementById('root')
//);

//Thinking in terms of hierarchies

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;
    
    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);

//next, determine which components will require state
/* 
The original list of products is passed in as props, so that’s not state. The search text and the checkbox seem to be state since they change over time and can’t be computed from anything. And finally, the filtered list of products isn’t state because it can be computed by combining the original list of products with the search text and value of the checkbox.

So finally, our state is:

The search text the user has entered
The value of the checkbox

ProductTable needs to filter the product list based on state and SearchBar needs to display the search text and checked state.
The common owner component is FilterableProductTable.
It conceptually makes sense for the filter text and checked value to live in FilterableProductTable

Note how the filtering already works if you set the initial state to 'ball'

Note the differences: 

-In the product table 
* we pass in the filterText and checkbox status as props. 

    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

* we edit the products iteration to check the props to build the products that we will render: 

      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
			
- Similarly in the SearchBar, 

* we pass props and use them to display: 

   const filterText = this.props.filterText;
   const inStockOnly = this.props.inStockOnly;	
	 
* we update the input elements to use these props: 

        <input
          type="text"
          placeholder="Search..."
          value={filterText} />
        <p>
          <input
            type="checkbox"
            checked={inStockOnly} />

- In the FilterProductsTable...

* we define the state: 
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
  }

* we then pass this information down to the components: 

        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />	
				
* Now instead of passing the text property in the input element as a const: 
value={filterText} />

We pass as prop: 
value={this.props.filterText}

The same for checkbox. 

Also, note that we have defined two change handlers (the definitions are passed from above. 
One for the text search and one for the text box: 

onChange={this.handleFilterTextChange}
onChange={this.handleInStockChange}				
*/

class ProductCategoryRow2 extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow2 extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable2 extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;


    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow2
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar2 extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={filterText} />
        <p>
          <input
            type="checkbox"
            checked={inStockOnly} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
  }

  render() {
    return (
      <div>
        <SearchBar2
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
        <ProductTable2
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}


const PRODUCTS2 = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];


//ReactDOM.render(
//  <FilterableProductTable2 products={PRODUCTS2} />,
//  document.getElementById('root')
//);


/* 
Next, notice how reverse data flow is implemented. 
That is, changes "deep" in the hierarchy update the 
state. 

- In the SearchBar component

* we define, but pass in the definition of the handler functions 
and do that weird bind thing in the newly added constructor: 

  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

* note how the render function changes also: 

we remove the hardcoded values and instead pull them as props

		//these get removed
    //const filterText = this.props.filterText;
    //const inStockOnly = this.props.inStockOnly;

		
- In the FilterProductsTable component
* we now have the change handlers bind thing in the constructor: 

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
		
* and the definitions: 

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

* and we pass them down in the components instantiated in the parent: 

        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}


          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}	
					
That's it! 					
*/

class ProductCategoryRow3 extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow3 extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable3 extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar3 extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }
  
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar3
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable3
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}


const PRODUCTS3 = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable3 products={PRODUCTS3} />,
  document.getElementById('root')
);



//Or you can ditch all of this and go for uncontrolled components
https://reactjs.org/docs/uncontrolled-components.html

//setup
//ReactDOM.render(<App />, document.getElementById('root'));
//eg 1
//ReactDOM.render(<Button1 label="Save This" />, document.getElementById('root'));
//eg 2
//can't get this to work, error is that "Target container is not a DOM element (which is referring to 'root'?)
//ReactDOM.render(  React.createElement(Button2, { label: "Save This Too" }, document.getElementById('root')));
//ReactDOM.render(<Button2 label="Save This Too" />, document.getElementById('root'));
//eg 3
//ReactDOM.render(InputForm1, document.getElementById('root'));
//eg 4
//ReactDOM.render(InputForm2, document.getElementById('root'));
//eg 5
//ReactDOM.render(<RandomValue />, document.getElementById('root'));
//eg 6
//ReactDOM.render(
//  <ErrorDisplay1 
//    message="These aren't the droids you're looking for" 
//  />,
//  document.getElementById('root')
//);	
//eg 7
//ReactDOM.render(
//  <MaybeError
//    errorMessage={Math.random() > 0.5 ? 'Not good' : ''}
//  />,
//  document.getElementById('root')
//);
//eg 8
//ReactDOM.render(<Doubler />, document.getElementById('root'));	
//eg 9
//ReactDOM.render(<Button4 label="Save 4" />, document.getElementById('root'));
//eg 10
//ReactDOM.render(<Button5 label="Save 5" />, document.getElementById('root'));
//eg 11
//ReactDOM.render(<Button6 label="Save 6" />, document.getElementById('root'));
//eg 12
//ReactDOM.render(<Form2 />, document.getElementById('root'));
//eg 13
//ReactDOM.render(<CounterButton />, document.getElementById('root'));



registerServiceWorker();
