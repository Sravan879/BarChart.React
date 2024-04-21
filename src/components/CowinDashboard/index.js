import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

class CowinDashboard extends Component {
  state = {
    isLoading: true,
    data: null,
    error: null,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      this.setState({data, isLoading: false})
    } catch (error) {
      this.setState({error: error.message, isLoading: false})
    }
  }

  render() {
    const {data, isLoading, error} = this.state

    if (isLoading) {
      return (
        <div className="loader-container">
          <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
        </div>
      )
    }

    if (error) {
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
          <VaccinationCoverage data={data} />
        </div>
        <div className="back1">
          <h1>Vaccination By Gender</h1>
          <VaccinationByGender data={data.vaccination_by_gender} />
        </div>
        <div className="back1">
          <h1>Vaccination By Age</h1>
          <VaccinationByAge data={data.vaccination_by_age} />
        </div>
      </div>
    )
  }
}

export default CowinDashboard
