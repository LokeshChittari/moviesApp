import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="account-container">
      <Header />
      <div className="account-details">
        <h1 className="account-heading">Account</h1>
        <div className="membership-details-section">
          <p className="membership-heading">Member ship</p>
          <div className="membership-details">
            <p className="user-email">{username}@gmail.com</p>
            <p className="user-password">Password : {password}</p>
          </div>
        </div>
        <div className="plan-details-section">
          <p className="plan-details-heading">Plan details</p>
          <div className="plan-details">
            <p className="plan-name">Premium</p>
            <p className="plan-feature">Ultra HD</p>
          </div>
        </div>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Account
