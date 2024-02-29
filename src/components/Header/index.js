import {Component} from 'react'
import {Link, withRouter, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {HiOutlineSearch} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {
    showMenuItems: false,
  }

  onClickSearch = () => {
    const {onClickSearchButton} = this.props
    onClickSearchButton()
  }

  onEnterSearchInput = e => {
    const {updateSearchInput} = this.props
    updateSearchInput(e.target.value)
  }

  onClickCloseBtn = () => {
    this.setState({
      showMenuItems: false,
    })
  }

  onClickMenuIcon = () => {
    this.setState({
      showMenuItems: true,
    })
  }

  onClickSearchBtn = () => {
    const {history} = this.props
    history.replace('/search')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {
      showSearchBtn,
      background,
      activeTab,
      showSearchInput,
      searchValue,
    } = this.props
    const {showMenuItems} = this.state

    return (
      <div
        className={
          background === 'BLUR'
            ? 'header-container bg-blur'
            : 'header-container'
        }
      >
        <nav className="nav-bar">
          <div className="nav-left">
            <Link to="/">
              <img
                className="website-logo-header"
                src="https://res.cloudinary.com/dofmvp5nf/image/upload/v1675189854/CCBP-MINI-PROJECT-1/Group_7399_wis6kd.png"
                alt="website logo"
              />
            </Link>
            <ul className="nav-items-left">
              <Link
                className={
                  activeTab === 'HOME'
                    ? 'nav-link-element active'
                    : 'nav-link-element'
                }
                to="/"
              >
                <li key="home" className="nav-item-left">
                  Home
                </li>
              </Link>
              <Link
                className={
                  activeTab === 'POPULAR'
                    ? 'nav-link-element active'
                    : 'nav-link-element'
                }
                to="/popular"
              >
                <li key="popular" className="nav-item-left">
                  Popular
                </li>
              </Link>
            </ul>
          </div>
          <div className="nav-right">
            {showSearchBtn === 'SHOW' && (
              <button
                type="button"
                className="search-button"
                testid="searchButton"
                onClick={this.onClickSearchBtn}
              >
                <HiOutlineSearch className="search-icon" />
              </button>
            )}
            {showSearchInput === 'SHOW' && (
              <div className="search-input-container">
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search"
                  onChange={this.onEnterSearchInput}
                  value={searchValue}
                />
                <button
                  className="search-input-button"
                  type="button"
                  testid="searchButton"
                  onClick={this.onClickSearch}
                >
                  <HiOutlineSearch className="search-input-icon" />
                </button>
              </div>
            )}
            <button
              type="button"
              className="menu-button"
              onClick={this.onClickMenuIcon}
            >
              <img
                className="hamburger-icon"
                src="https://res.cloudinary.com/dofmvp5nf/image/upload/v1675366399/CCBP-MINI-PROJECT-1/hamburger-icon_jxviv9.png"
                alt="hamburgur icon"
              />
            </button>
            <Link to="/account">
              <img
                className="avatar-icon"
                src="https://res.cloudinary.com/dofmvp5nf/image/upload/v1675444492/CCBP-MINI-PROJECT-1/Avatar_lw2uvb.png"
                alt="profile"
              />
            </Link>
          </div>
        </nav>
        {showMenuItems && (
          <ul className="nav-items-mobile">
            <Link
              className={
                activeTab === 'HOME'
                  ? 'nav-link-element active'
                  : 'nav-link-element'
              }
              to="/"
            >
              <li key="home" className="nav-item-right">
                Home
              </li>
            </Link>
            <Link
              className={
                activeTab === 'POPULAR'
                  ? 'nav-link-element active'
                  : 'nav-link-element'
              }
              to="/popular"
            >
              <li key="popular" className="nav-item-right">
                Popular
              </li>
            </Link>
            <Link
              className={
                activeTab === 'PROFILE'
                  ? 'nav-link-element active'
                  : 'nav-link-element'
              }
              to="/account"
            >
              <li key="account" className="nav-item-left">
                Account
              </li>
            </Link>
            <li key="closeButton">
              <button
                className="close-icon-btn"
                type="button"
                onClick={this.onClickCloseBtn}
              >
                <AiFillCloseCircle className="close-icon" />
              </button>
            </li>
          </ul>
        )}
      </div>
    )
  }
}

export default withRouter(Header)
