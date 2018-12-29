import React from "react";
import "./main.css"
import Navigation from "./navigation";
import Movies from "./movie";

const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieUrl: apiUrl,
            genres:[],
            genre:'Action',
            genreId:'0',
            year: {
                label: "year",
                min: 1990,
                max: 2017,
                step: 1,
                value: { min: 2000, max: 2017 }
              },
            rating: {
                label: "rating",
                min: 0,
                max: 10,
                step: 1,
                value: { min: 8, max: 10 }
              },
            runtime: {
                label: "runtime",
                min: 0,
                max: 300,
                step: 15,
                value: { min: 60, max: 120 }
           }
        };
    }

   handleGenreChange (event) {
              const selectedGenre = event.target.value;
              let selectedGenreObj = this.state.genres.find(genre => genre.name == selectedGenre);
              // console.log('new id is ' + selectedGenreObj.id);
              this.setState({
                  genre: selectedGenreObj.name,
                  genreId: selectedGenreObj.id
               });       
            }

    handleSliderChange(data) {
        this.setState({
          [data.type]: {
            ...this.state[data.type],
            value: data.value
          }
        });
     }

    handleOnClick() {
      const {genreId, year, rating, runtime} = this.state;
      console.log ('genre id is ' + this.props.genreId);

      const updateUrl = `https://api.themoviedb.org/3/discover/movie?` +
                        `api_key=${process.env.REACT_APP_TMDB_API_KEY}&` +
                        `language=en-US&sort_by=popularity.desc&` +
                        `with_genres=${genreId}&` +
                        `primary_release_date.gte=${year.value.min}-01-01&` +
                        `primary_release_date.lte=${year.value.max}-12-31&` +
                        `vote_average.gte=${rating.value.min}&` +
                        `vote_average.lte=${rating.value.max}&` +
                        `with_runtime.gte=${runtime.value.min}&` +
                        `with_runtime.lte=${runtime.value.max}&` +
                        `page=1&`;
      this.setState( {movieUrl: updateUrl});
    }
    
    // Fetch genres for dropdown list
    componentDidMount() {
        const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
          fetch(genresURL)
            .then(response => response.json())
            .then(data => this.setState({genres: data.genres }))
            .catch(error => console.log(error));
    }

  render() {
    return (
      <section className="main">
        <Navigation
            handleGenreChange={ (event) => this.handleGenreChange(event) }
            handleSliderChange={ (data) => this.handleSliderChange(data) }
            handleClick = { () => this.handleOnClick() }
            genre={this.state.genre}
            genres={this.state.genres}
            year={this.state.year} 
            rating={this.state.rating}
            runtime={this.state.runtime}
        ></Navigation>
        <Movies apiUrl={this.state.movieUrl}/>
      </section>
    )
  }
}

export default Main;