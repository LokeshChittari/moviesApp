import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {GoAlert} from 'react-icons/go'
import {Link} from 'react-router-dom'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingNow extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingMovies: [],
  }

  componentDidMount() {
    this.getTrendingNowMoviesList()
  }

  getTrendingNowMoviesList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.in_progress})

    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
          trendingMovies: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getTrendingNowMoviesList()
  }

  renderLoader = () => (
    <div className="trending-now-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="trending-now-failure-view">
      <img
        className="alert-image-icon"
        src="https://res.cloudinary.com/dofmvp5nf/image/upload/v1681042812/CCBP-MINI-PROJECT-1/alert-triangle_iksrul.png"
        alt="failure view"
      />
      <p className="failure-view-text">
        Something went wrong. Please try again.
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

  renderSliderView = () => {
    const {trendingMovies} = this.state
    const settings = {
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    }
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {trendingMovies.map(trendingMovie => (
            <Link
              key={trendingMovie.id}
              className="link-element"
              to={`/movies/${trendingMovie.id}`}
            >
              <img
                className="slider-item-image"
                src={trendingMovie.posterPath}
                alt={trendingMovie.title}
              />
            </Link>
          ))}
        </Slider>
      </div>
    )
  }

  renderTrendingView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSliderView()
      default:
        return this.renderLoader()
    }
  }

  render() {
    return (
      <div className="trending-now-container">
        <h1 className="movie-category">Trending Now</h1>
        {this.renderTrendingView()}
      </div>
    )
  }
}

export default TrendingNow
