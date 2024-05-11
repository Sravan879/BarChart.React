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
      //Access the data inside the if condition
      const data = await response.json()

      //format the data
      const updatedData = {
        last7Days: data.last_7_days_vaccination,
        vacByAge: data.vaccination_by_age,
        vacByGender: data.vaccination_by_gender,
      }

      //update the state directly here
      this.setState({
        apiStatus: apiConstant.success,
        data: updatedData,
      })
    } else {
      //use the else condition to update the failure case
      this.setState({
        apiStatus: apiConstant.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderProgress = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccess = () => {
    const {data} = this.state
    return (
      <div className="back">
        <h1>CoWIN Vaccination in India</h1>
        <div className="back1">
          <h1>Vaccination Coverage</h1>
          <VaccinationCoverage data={data} />
        </div>
        <div className="back1">
          <h1>Vaccination by gender</h1>
          <VaccinationByGender data={data.vacByGender} />
        </div>
        <div className="back1">
          <h1>Vaccination by Age</h1>
          <VaccinationByAge data={data.vacByAge} />
        </div>
      </div>
    )
  }
  rey = () => {
  const { apiConstant } = this.state

  switch (apiStatus) {
    case apiConstant.success:
      return this.renderSuccess();
    case apiConstant.failure:
      return this.renderFailureView();
    case apiConstant.progress:
      return this.renderProgress();
    default:
      return null;
  }
}

  render() {
    return (
      <div className="bac">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          className="img1"
          alt="website logo"
        />
        <h1>co-WIN</h1>
        {this.rey()}
      </div>
    )
  }
}

export default CowinDashboard

