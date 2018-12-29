import React from "react";
import "./movie.css";

const MovieListItem = (data) => {
    const movieInfo = data.movieInfo;
    const imageSrc = "https://image.tmdb.org/t/p/" + "original/" + movieInfo.poster_path;
    const year = movieInfo.release_date.substring(0, 4);

    return (<div className = "movie" >
            <li className="movie-item"  >
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
        this.state = {
            movies: [],
            apiUrl: defaultUrl
        };

    }
  storeMovieData(movieData) {
      const movieResults = movieData.results.map(movieEntry => {
        // Get relevant entries from JSON result
      const  { vote_count, id, genre_ids, poster_path, title, vote_average, release_date } = movieEntry;
          // return relevant entries
        return { vote_count, id, genre_ids, poster_path, title, vote_average, release_date };
     });
      this.setState({
      movies: movieResults
     });  
    }

  getMovieData = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => { this.storeMovieData(data); } )
        .catch(error => console.log(error))
  }
 componentDidMount() {
    this.getMovieData(this.state.apiUrl);
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.apiUrl !== nextProps.apiUrl) {
      console.log('url is ' + nextProps.apiUrl);
      this.getMovieData(nextProps.apiUrl);
    // }
  }

  render() {
    // this.setState({apiUrl: this.props.apiUrl});
    return (
      <section className="movies">
       <MovieList movies ={this.state.movies}/>
      </section>
    )
  }
}

export default Movies;