import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {
    searchValue: '',
    searchedItemsList: [],
    apiStatus: apiStatusConstants.initial,
    submitted: false,
  }

  updateSearchInput = searchInput => {
    this.setState({
      searchValue: searchInput,
    })
  }

  onClickSearchButton = () => {
    const {searchValue} = this.state
    if (searchValue !== '') {
      this.getSearchMoviesList()
    }
  }

  onClickTryAgain = () => {
    const {searchValue} = this.state
    if (searchValue !== '') {
      this.getSearchMoviesList()
    }
  }

  getSearchMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress, submitted: false})
    const jwtToken = Cookies.get('jwt_token')
    const {searchValue} = this.state
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
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
        // console.log(data)
        const updatedData = data.results.map(sData => ({
          backdropPath: sData.backdrop_path,
          id: sData.id,
          overview: sData.overview,
          posterPath: sData.poster_path,
          title: sData.title,
        }))
        this.setState({
          searchedItemsList: updatedData,
          apiStatus: apiStatusConstants.success,
          submitted: true,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSearchFailureView = () => (
    <div className="search-failure-view-container">
      <img
        className="failure-view-image"
        src="https://res.cloudinary.com/dofmvp5nf/image/upload/v1675968083/CCBP-MINI-PROJECT-1/something_went_wrong_flhoht.png"
        alt="failure view"
      />
      <p className="failure-view-text">
        Something went wrong. Please try again
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

  renderSearchSuccessView = () => {
    const {searchedItemsList, searchValue} = this.state
    if (searchedItemsList.length <= 0) {
      return (
        <div className="search-failure-view-container">
          <img
            className="failure-view-image"
            src="https://res.cloudinary.com/dofmvp5nf/image/upload/v1676214436/CCBP-MINI-PROJECT-1/Group_7394_1_zngija.png"
            alt="no movies"
          />
          <p className="failure-view-text">
            Your search for {searchValue} did not find any matches.
          </p>
        </div>
      )
    }
    return (
      <ul className="search-movies-list">
        {searchedItemsList.map(movieItem => (
          <li key={movieItem.id} className="movie-item-container">
            <Link className="link-element" to={`/movies/${movieItem.id}`}>
              <img
                className="movie-item-img"
                src={movieItem.backdropPath}
                alt={movieItem.title}
              />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderSearchLoaderView = () => (
    <div className="search-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSearchListView = () => {
    const {apiStatus, searchValue} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderSearchFailureView()
      case apiStatusConstants.success:
        return searchValue !== '' ? this.renderSearchSuccessView() : null
      default:
        return this.renderSearchLoaderView()
    }
  }

  render() {
    const {submitted} = this.state
    return (
      <div className="search-movies-container">
        <Header
          showSearchInput="SHOW"
          activeTab=""
          onClickSearchButton={this.onClickSearchButton}
          updateSearchInput={this.updateSearchInput}
        />

        {submitted && this.renderSearchListView()}
      </div>
    )
  }
}

export default Search
