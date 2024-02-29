import Slider from 'react-slick'
import {GoAlert} from 'react-icons/go'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

const Originals = props => {
  const {originalsList, apiStatus, apiStatusConstants, tryAgain} = props

  const renderOriginalsFailureView = () => (
    <div className="originals-failure-view">
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
  )

  const renderOriginalsLoaderView = () => (
    <div className="originals-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  const renderOriginalsSuccessView = () => {
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
          {originalsList.map(originalDetails => (
            <Link
              key={originalDetails.id}
              className="link-element"
              to={`/movies/${originalDetails.id}`}
            >
              <img
                className="slider-item-image"
                src={originalDetails.posterPath}
                alt={originalDetails.title}
              />
            </Link>
          ))}
        </Slider>
      </div>
    )
  }

  const renderOriginalsListView = () => {
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return renderOriginalsFailureView()
      case apiStatusConstants.success:
        return renderOriginalsSuccessView()
      default:
        return renderOriginalsLoaderView()
    }
  }

  return (
    <div className="originals-container">
      <h1 className="movie-category">Originals</h1>
      {renderOriginalsListView()}
    </div>
  )
}

export default Originals
