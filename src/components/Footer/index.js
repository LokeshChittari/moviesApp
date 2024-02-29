import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = props => {
  const {transparent} = props
  return (
    <div
      className={
        transparent === 'YES'
          ? 'footer-container bg-transparent'
          : 'footer-container'
      }
    >
      <ul className="icons-list">
        <li key="google">
          <FaGoogle className="icon-image" />
        </li>
        <li key="twitter">
          <FaTwitter className="icon-image" />
        </li>
        <li key="instagram">
          <FaInstagram className="icon-image" />
        </li>
        <li key="youtube">
          <FaYoutube className="icon-image" />
        </li>
      </ul>
      <p className="contact-us-heading">Contact Us</p>
    </div>
  )
}

export default Footer
