import React from "react";
import "./navigation.css";
import Slider from "./slider";

class Selection extends React.Component {
    constructor(props)
    {
        super(props);
    }
    render() {
        return (
            <select value ={this.props.genre} onChange={this.props.onChange} >
              {
                   this.props.genres.map(genre => <option value={genre.name}> {genre.name}</option> )
               }
            </select>
        );
    }
 }

const SearchButton = ({ onClick }) => (
  <div className="search-button">
    <button onClick={onClick} > Search!</button>
  </div>
)

class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {
    const { genre, genres, handleGenreChange, handleSliderChange, handleSearchClick, year, rating, runtime } = this.props;
    return (
      <section className="navigation">
        Navigation
        <Selection onChange={handleGenreChange} genres = {genres} genre ={genre}> </Selection>
        <Slider onChange={ handleSliderChange} data={year}> </Slider>
        <Slider onChange={ handleSliderChange } data={rating}> </Slider>
        <Slider onChange={ handleSliderChange} data={runtime}> </Slider>
        <SearchButton onClick={handleSearchClick} ></SearchButton>
        </section>
    )
  }
}

export default Navigation;