import React from "react";
import "./main.css"
import Navigation from "./navigation";
import Movies from "./movie";

// default url which has all movies initially
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages:1,
            currentPage:1,
            movies: [],
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
              console.log('id is ' + this.state.genreId); 
            }

    handleSliderChange(data) {
        this.setState({
          [data.type]: {
            ...this.state[data.type],
            value: data.value
          }
        });
     }

    getUrl(currentPage) {
       const {genreId, year, rating, runtime} = this.state;
        const url = `https://api.themoviedb.org/3/discover/movie?` +
                          `api_key=${process.env.REACT_APP_TMDB_API_KEY}&` +
                          `language=en-US&sort_by=popularity.desc&` +
                          `with_genres=${genreId}&` +
                          `primary_release_date.gte=${year.value.min}-01-01&` +
                          `primary_release_date.lte=${year.value.max}-12-31&` +
                          `vote_average.gte=${rating.value.min}&` +
                          `vote_average.lte=${rating.value.max}&` +
                          `with_runtime.gte=${runtime.value.min}&` +
                          `with_runtime.lte=${runtime.value.max}&` +
                          `page=${currentPage}&`;
        return url;
    }
    handleSearchClick() {
      this.setState( {currentPage : 1, movieUrl: this.getUrl(1)});
       console.log("current url is "  + this.getUrl(1));
    }
    /* 
    componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). 
      Initialization that requires DOM nodes should go here. 
      If you need to load data from a remote endpoint, this is a good place to instantiate the network request
    */
     fetchGenres() {
       // Fetch genres if we need them
        const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        fetch(genresURL)
                    .then(response => response.json())
                    .then(data => this.setState({genres: data.genres, genre : data.genres[0].name, genreId : data.genres[0].id}))
                    .catch(error => console.log(error));
    }
    componentDidMount() {
      const savedState = this.getStateFromLocalStorage();
      if (savedState) { /* never persisted */
        console.log("From saved state id is " + savedState.genreId);
        this.setState({ ...savedState });
        if (!savedState.genres.length)
          this.fetchGenres();
      }
      else {
         this.fetchGenres();
      }
    
    }

    // React to changes in updating state
    componentWillUpdate(nextProps, nextState) {
      this.saveStateToLocalStorage();
      // if (this.state.moviesUrl !== nextState.moviesUrl) {
        
      //   this.fetchMovies(nextState.moviesUrl);
      // }
    }

  handlePageTurn (dir) {
    if (dir === "Next")
    {
      const updatePage = this.state.currentPage + 1;
      if (updatePage < this.state.totalPages)
        this.setState ({currentPage: updatePage, movieUrl: this.getUrl(updatePage)});
    }
    else
    {
      console.log("PreviousPage");
      const updatePage = this.state.currentPage - 1;

     if (updatePage > 0)
        this.setState ( {currentPage: updatePage, movieUrl: this.getUrl(updatePage)});
    }
  }
  
  saveStateToLocalStorage = () => {
    localStorage.setItem("movieapp.params", JSON.stringify(this.state));
  }

  getStateFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("movieapp.params"));
  }

  storeMovieData(movieData) {
      const movieResults = movieData.results.map(movieEntry => {
        // Get relevant entries from JSON result
      const  { vote_count, id, genre_ids, poster_path, title, vote_average, release_date } = movieEntry;
          // return relevant entries
        return { vote_count, id, genre_ids, poster_path, title, vote_average, release_date };
     });
      this.setState({
      movies: movieResults,
      totalPages:movieData.total_pages,
      currentPage:movieData.page
     });  
      // console.log('current page is ' + movieData.currentPage);
      // console.log('total page is ' + movieData.totalPages);
    }

  render() {
    console.log('genre is ' + this.state.genre + ' with id ' + this.state.genreId);
    return (
      <section className="main">
        <Navigation
            handleGenreChange={ (event) => this.handleGenreChange(event) }
            handleSliderChange={ (data) => this.handleSliderChange(data) }
            handleSearchClick = { () => this.handleSearchClick() }
            genre={this.state.genre}
            genres={this.state.genres}
            year={this.state.year} 
            rating={this.state.rating}
            runtime={this.state.runtime}
        ></Navigation>
        <Movies 
            movies ={this.state.movies} 
            apiUrl={this.state.movieUrl} 
            movieUpdateCb={ (data) => this.storeMovieData(data) }
            pageOnClick= { (dir) => this.handlePageTurn(dir) }
            currentPage  = {this.state.currentPage }/>
      </section>
    )
  }
}

export default Main;