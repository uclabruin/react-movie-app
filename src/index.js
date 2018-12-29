import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Choice 1:
const MovieListItem = (props) => (
    <li>{props.title}</li>
)

// Choice 2:
// function MovieListItem (props)  {
//     return ( <li>{props.title}</li>);
// }

// Choice 3: Class with render() function
class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
        this.onClick = this.onClick.bind(this);

    }
    increaseCounter(state) {
       return { counter: this.state.counter + 1};
    }
    onClick () {
        this.setState(this.increaseCounter)
    }
    render () {
        return (
            <div>
            <button onClick={this.onClick}>Upvote movie </button>
            <h1>
            <span> {this.state.counter} </span>
             Test movie 
            </h1>
            </div>
        );
    }
}
class MovieList extends React.Component{
    render() {
        return (
        <ul>
            {
                this.props.titles.map( titleEntry => <MovieListItem title={titleEntry} />)
            }
        </ul>
        );
    }
}


// class MovieApp extends React.Component {
// render() {
//     const titles = ["Breaking bad", "Narcos", "Game of Thrones"];

//     return (
//         <MovieList titles = {titles}/>
//     );
// }

// }

// class MovieApp extends React.Component {
// render() {
//       console.log('API key:', process.env.REACT_APP_TMDB_API_KEY);
//     return (
//         <div> Test</div>
//     );
// }

// }

ReactDOM.render(<App />, document.getElementById('root'));

