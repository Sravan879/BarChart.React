import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    isLoading: true,
    apiStatus: '',
    data: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiConstant.progress,
    })

    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      this.setState({
        apiStatus: apiConstant.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiConstant.failure,
      })
    }
    const data = await response.json()
    this.setState({data})
  }

  renderFailureView = () => {
    return (
      <div className="failure-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
        <h1>Something went wrong</h1>
      </div>
    )
  }

  renderProgress = () => {
    return (
      <div className="loader-container">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    )
  }

  renderSuccess = () => {
    return (
      <div className="back">
        <div className="bac">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="img1"
            alt="website logo"
          />
          <h1>co-WIN</h1>
        </div>
        <h1>CoWIN Vaccination in India</h1>
        <div className="back1">
          <h1>Vaccination Coverage</h1>
          <VaccinationCoverage data={this.data} />
        </div>
        <div className="back1">
          <h1>Vaccination by gender</h1>
          <VaccinationByGender data={this.data.vaccination_by_gender} />
        </div>
        <div className="back1">
          <h1>Vaccination by Age</h1>
          <VaccinationByAge data={this.data.vaccination_by_age} />
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstant.success:
        return this.renderSuccess()
      case apiConstant.failure:
        return this.renderFailureView()
      case apiConstant.progress:
        return this.renderProgress()
      default:
        return null
    }
  }
}

export default CowinDashboard

