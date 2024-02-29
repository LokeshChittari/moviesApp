import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
// import formatDuration from 'date-fns/formatDuration'
import getYear from 'date-fns/getYear'
// import parse from 'date-fns/parse'
import format from 'date-fns/format'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieItemDetails: {},
  }

  componentDidMount() {
    this.getMovieItemDetails()
  }

  onClickTryAgain = () => {
    this.getMovieItemDetails()
  }

  getMovieItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(url, options)
      if (response.ok === true) {
        const data = await response.json()
        const updatedData = {
          id: data.movie_details.id,
          adult: data.movie_details.adult,
          backdropPath: data.movie_details.backdrop_path,
          budget: data.movie_details.budget,
          genres: data.movie_details.genres.map(genre => ({
            id: genre.id,
            name: genre.name,
          })),
          overview: data.movie_details.overview,
          posterPath: data.movie_details.poster_path,
          releaseDate: data.movie_details.release_date,
          runtime: data.movie_details.runtime,
          similarMovies: data.movie_details.similar_movies.map(
            similarMovie => ({
              backdropPath: similarMovie.backdrop_path,
              id: similarMovie.id,
              overview: similarMovie.overview,
              posterPath: similarMovie.poster_path,
              title: similarMovie.title,
            }),
          ),
          spokenLanguages: data.movie_details.spoken_languages.map(
            spokenLanguage => ({
              id: spokenLanguage.id,
              englishName: spokenLanguage.english_name,
            }),
          ),
          title: data.movie_details.title,
          voteAverage: data.movie_details.vote_average,
          voteCount: data.movie_details.vote_count,
        }
        this.setState({
          movieItemDetails: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        // console.log('#################')
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      //   console.log(e, '$$$$$$$$$$$$$$$$$')
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  movieItemDetailsSuccessView = () => {
    const {movieItemDetails} = this.state
    const hours = Math.floor(movieItemDetails.runtime / 60)
    const minutes = movieItemDetails.runtime - hours * 60
    const formattedDate = format(
      new Date(movieItemDetails.releaseDate),
      'do MMMM yyyy',
    )
    return (
      <>
        <div
          className="movie-item-poster-container"
          style={{
            backgroundImage: movieItemDetails
              ? `url(${movieItemDetails.backdropPath})`
              : 'none',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
          }}
        >
          <Header background="BLUR" activeTab="" showSearchBtn="SHOW" />
          <div className="movie-item-poster-details">
            <h2 className="movie-item-poster-title">
              {movieItemDetails.title}
            </h2>
            <div className="duration-certificate-year">
              <p className="duration">{`${hours}h ${minutes}m`}</p>
              <p className="certification">
                {movieItemDetails.adult === true ? 'A' : 'U/A'}
              </p>
              <p className="year">
                {getYear(new Date(movieItemDetails.releaseDate))}
              </p>
            </div>
            <p className="overview">{movieItemDetails.overview}</p>
            <button className="play-button" type="button">
              Play
            </button>
          </div>
        </div>
        <div className="movie-item-details-section">
          <div className="item-section-container">
            <h4 className="section-heading">Genres</h4>
            <ul className="section-list">
              {movieItemDetails.genres.map(genreItem => (
                <li key={genreItem.id} className="section-item-value">
                  <p className="genre">{genreItem.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="item-section-container">
            <h4 className="section-heading">Audio Available</h4>
            <ul className="section-list">
              {movieItemDetails.spokenLanguages.map(language => (
                <li id={language.id} className="section-item-value">
                  <p className="language">{language.englishName}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="item-section-container">
            <h4 className="section-heading">Rating Count</h4>
            <p className="section-item-value">{movieItemDetails.voteCount}</p>
            <h4 className="section-heading">Rating Average</h4>
            <p className="section-item-value">{movieItemDetails.voteAverage}</p>
          </div>
          <div className="item-section-container">
            <h4 className="section-heading">Budget</h4>
            <p className="section-item-value">{movieItemDetails.budget}</p>
            <h4 className="section-heading">Release Date</h4>
            <p className="section-item-value">{formattedDate}</p>
          </div>
        </div>
        <div className="more-like-this-section">
          <h1 className="side-heading">More like this</h1>
          <ul className="similar-movies-list">
            {movieItemDetails.similarMovies.map(similarMovie => (
              <li key={similarMovie.id} className="similar-movie-item">
                <Link
                  className="similar-movie-link-element"
                  to={`/movies/${similarMovie.id}`}
                >
                  <img
                    className="similar-movie-img"
                    src={similarMovie.posterPath}
                    alt={similarMovie.title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  movieItemDetailsLoaderView = () => (
    <>
      <Header activeTab="" showSearchBtn="SHOW" />
      <div className="movie-item-loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  movieItemDetailsFailureView = () => (
    <>
      <Header activeTab="" showSearchBtn="SHOW" />
      <div className="movie-item-failure-container">
        <img
          className="failure-view-image"
          src="https://res.cloudinary.com/dofmvp5nf/image/upload/v1675968083/CCBP-MINI-PROJECT-1/something_went_wrong_flhoht.png"
          alt="failure view"
        />
        <p className="failure-view-text">
          Something went wrong, Please try again.
        </p>
        <button
          className="try-again-button"
          type="button"
          onClick={this.onClickTryAgain}
        >
          Try Again
        </button>
      </div>
    </>
  )

  renderMovieItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.movieItemDetailsFailureView()
      case apiStatusConstants.success:
        return this.movieItemDetailsSuccessView()
      default:
        return this.movieItemDetailsLoaderView()
    }
  }

  render() {
    return (
      <div className="movie-item-details-container">
        {this.renderMovieItemDetails()}
      </div>
    )
  }
}

export default MovieItemDetails
