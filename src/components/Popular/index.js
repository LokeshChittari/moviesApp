import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
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

class Popular extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    popularMoviesList: [],
  }

  componentDidMount() {
    this.getPopularMoviesList()
  }

  onClickTryAgain = () => {
    this.getPopularMoviesList()
  }

  getPopularMoviesList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.in_progress})

    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
        const updatedData = data.results.map(sData => ({
          backdropPath: sData.backdrop_path,
          id: sData.id,
          overview: sData.overview,
          posterPath: sData.poster_path,
          title: sData.title,
        }))
        this.setState({
          popularMoviesList: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPopularFailureView = () => (
    <div className="popular-failure-view-container">
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
  )

  renderPopularSuccessView = () => {
    const {popularMoviesList} = this.state
    return (
      <div className="movies-list-container">
        <ul className="popular-movies-list">
          {popularMoviesList.map(movieItem => (
            <li key={movieItem.id} className="movie-item-container">
              <Link className="link-element" to={`/movies/${movieItem.id}`}>
                <img
                  className="movie-item-img"
                  src={movieItem.posterPath}
                  alt={movieItem.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderPopularLoaderView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPopularListView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderPopularFailureView()
      case apiStatusConstants.success:
        return this.renderPopularSuccessView()
      default:
        return this.renderPopularLoaderView()
    }
  }

  render() {
    return (
      <div className="popular-movies-container">
        <Header showSearchBtn="SHOW" activeTab="POPULAR" />
        {this.renderPopularListView()}
        {/* {apiStatus === apiStatusConstants.success && <Footer />} */}
        <Footer />
      </div>
    )
  }
}

export default Popular
