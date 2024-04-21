import React from 'react'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#5a8dee" />
          <Cell name="44-60" fill="#f54394" />
          <Cell name="60 Above" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByAge
