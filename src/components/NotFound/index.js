import {Link} from 'react-router-dom'

import './index.css'

const NotFound = props => {
  const onClickHomeBtn = () => {
    const {history} = props
    history.push('/')
  }
  return (
    <div className="not-found-container">
      <h1 className="not-found-response">Lost Your Way?</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>

      <button
        className="go-to-home-button"
        type="button"
        onClick={onClickHomeBtn}
      >
        <Link
          className="home-link-element"
          to="/"
          style={{textDecoration: 'none', color: '#171f46'}}
        >
          Go to Home
        </Link>
      </button>
    </div>
  )
}

export default NotFound
