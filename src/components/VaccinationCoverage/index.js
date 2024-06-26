import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = ({data}) => {
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toFixed(1)}k`
    }
    return number.toString()
  }

  return (
      <BarChart data={data.last7Days} margin={{top: 5}} width={1000} height={300}>
        <XAxis dataKey="vaccine_date" tick={{stroke: 'gray', strokeWidth: 1}} />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{stroke: 'gray', strokeWidth: 0}}
        />
        <Legend wrapperStyle={{padding: 30}} />
        <Bar dataKey="dose_1" name="Dose1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="dose_2" name="Dose2" fill="#f54394" barSize="20%" />
      </BarChart>
  )
}

export default VaccinationCoverage
