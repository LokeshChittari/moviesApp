import {Component} from 'react'
import Cookies from 'js-cookie'

import Poster from '../Poster'
import Originals from '../Originals'
import TrendingNow from '../TrendingNow'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    originalsList: [],
  }

  componentDidMount() {
    this.getOriginalsList()
  }

  tryAgain = () => {
    this.getOriginalsList()
  }

  getOriginalsList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.in_progress})

    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
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
        originalsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {originalsList, apiStatus} = this.state
    return (
      <div className="home-container">
        <Poster
          originalsList={originalsList}
          apiStatus={apiStatus}
          apiStatusConstants={apiStatusConstants}
          tryAgain={this.tryAgain}
        />
        <TrendingNow />
        <Originals
          originalsList={originalsList}
          apiStatus={apiStatus}
          apiStatusConstants={apiStatusConstants}
          tryAgain={this.tryAgain}
        />
        <Footer />
      </div>
    )
  }
}

export default Home
