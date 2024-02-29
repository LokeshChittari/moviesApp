import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMessage: '',
  }

  onChangeUsernameInput = e => {
    this.setState({username: e.target.value})
  }

  onChangePasswordInput = e => {
    this.setState({password: e.target.value})
  }

  onSuccessResponse = jwtToken => {
    const {username, password} = this.state
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    localStorage.setItem('username', username)
    const passwordLength = password.length
    const maskedPassword = '*'.repeat(passwordLength)
    localStorage.setItem('password', maskedPassword)
    history.replace('/')
  }

  onFailureResponse = errorMsg => {
    this.setState({showErrorMsg: true, errorMessage: errorMsg})
  }

  onSubmitSignInForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessResponse(data.jwt_token)
    } else {
      this.onFailureResponse(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          className="login-website-logo"
          src="https://res.cloudinary.com/dofmvp5nf/image/upload/v1675189854/CCBP-MINI-PROJECT-1/Group_7399_wis6kd.png"
          alt="login website logo"
        />
        <div className="login-responsive-container">
          <form className="form-container" onSubmit={this.onSubmitSignInForm}>
            <h1 className="login-page-heading">Login</h1>
            <label className="label-text" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              id="username"
              className="user-input-login"
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsernameInput}
            />
            <br />
            <br />
            <label className="label-text" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              id="password"
              className="user-input-login"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangePasswordInput}
            />
            <br />
            {showErrorMsg && <p className="error-message">{errorMessage}</p>}
            <button className="signin-button" type="submit">
              Sign in
            </button>
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
