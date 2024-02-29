import Loader from 'react-loader-spinner'
import {GoAlert} from 'react-icons/go'

import Header from '../Header'
import './index.css'

const Poster = props => {
  const {originalsList, apiStatus, apiStatusConstants, tryAgain} = props

  const renderPosterLoaderView = () => (
    <>
      <Header activeTab="HOME" />
      <div className="poster-loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  const renderPosterFailureView = () => (
    <>
      <Header activeTab="HOME" />
      <div className="failure-view-container">
        <img
          className="alert-image-icon"
          src="https://res.cloudinary.com/dofmvp5nf/image/upload/v1681042812/CCBP-MINI-PROJECT-1/alert-triangle_iksrul.png"
          alt="failure view"
        />
        <p className="failure-view-text">
          Something went wrong. Please try again.
        </p>
        <button className="try-again-button" type="button" onClick={tryAgain}>
          Try Again
        </button>
      </div>
    </>
  )

  const renderPosterSuccessView = () => {
    const randomIndex = Math.floor(Math.random() * originalsList.length)
    const posterDetails = originalsList[randomIndex]

    return (
      <div className="poster-container">
        {/* <h1 className="movie-category">Originals</h1> */}
        <div
          className="movie-poster-display"
          style={{
            backgroundImage: posterDetails
              ? `url(${posterDetails.backdropPath})`
              : 'none',
            //   height: '600px',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <Header background="BLUR" activeTab="HOME" showSearchBtn="SHOW" />
          <div className="poster-details-container">
            <h1 className="poster-heading">{posterDetails.title}</h1>
            <p className="poster-overview">{posterDetails.overview}</p>
            <button className="play-button" type="button">
              Play
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderPosterView = () => {
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return renderPosterFailureView()
      case apiStatusConstants.success:
        return renderPosterSuccessView()
      default:
        return renderPosterLoaderView()
    }
  }

  return renderPosterView()
}

export default Poster
