import React from "react";
import "./movie.css";
import { Link } from "react-router-dom";


const MovieListItem = (data) => {
    const movieInfo = data.movieInfo;
    const imageSrc = "https://image.tmdb.org/t/p/" + "original/" + movieInfo.poster_path;
    const year = movieInfo.release_date.substring(0, 4);
    const { id, title, poster_path, release_year, vote_average } = movieInfo;
    return (<div className = "movie" >
            <li className="movie-item"  >
             <Link to={`/movie_page/${id}`} className="thumbnail">
              <img src={imageSrc} alt="" />
              <div className="movie-description">
                <h1>{movieInfo.title}</h1>
                <div className="movie-details">
                  <div className="movie-year">
                    <span className="title">Year </span>
                    <span>{year}  </span>
                  </div>
                  <div className="movie-rating">
                    <span className="title">Rating </span>
                    <span>{movieInfo.vote_average}  </span>
                  </div>
                </div>
              </div>
              </Link>
            </li>
            </div>);
}


class MovieList extends React.Component{
    render() {
        return (
        <div class="movielist">
            {    
                 this.props.movies.map( movieEntry => <MovieListItem movieInfo={movieEntry} /> )
            }
        </div>
        );
    }
}

const defaultUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`

class Movies extends React.Component {
    constructor(props) {
        super(props);
    }

  getMovieData = (url) => {
     console.log('fetch url is ' + url);

    fetch(url)
        .then(response => response.json())
        .then(data => { this.props.movieUpdateCb(data); } )
        .catch(error => console.log(error))
  }

 componentDidMount() {
    this.getMovieData(this.props.apiUrl);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.apiUrl !== nextProps.apiUrl) {
      console.log('url is ' + nextProps.apiUrl);
      this.getMovieData(nextProps.apiUrl);
    }
  }

  render() {
    // this.setState({apiUrl: this.props.apiUrl});
    return (
      <section className="movies">
       <MovieList movies ={this.props.movies}/>
        <div className="pagination">
          <button onClick={ () => {this.props.pageOnClick("Previous") } }>Previous</button>
          <span>{`Page ${this.props.currentPage}`}</span>
          <button onClick={ () => {this.props.pageOnClick("Next")} }>Next</button>
        </div>
      </section>
    )
  }
}

export default Movies;