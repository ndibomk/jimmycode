import React from 'react';
import { Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { month: 'Jan', subscribers: 100, watchHours: 2000 },
  { month: 'Feb', subscribers: 150, watchHours: 2500 },
  { month: 'Mar', subscribers: 200, watchHours: 3000 },
  { month: 'Apr', subscribers: 250, watchHours: 3500 },
  { month: 'May', subscribers: 300, watchHours: 4000 },
  { month: 'Jun', subscribers: 350, watchHours: 4500 },
  { month: 'Jul', subscribers: 400, watchHours: 5000 },
  { month: 'Aug', subscribers: 450, watchHours: 5500 },
  { month: 'Sep', subscribers: 500, watchHours: 6000 },
  { month: 'Oct', subscribers: 550, watchHours: 6500 },
];

const Report = () => {
  return (
    <Card title="Report" style={{ margin: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <h2>Subscribers</h2>
          <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="subscribers" stroke="#8884d8" />
          </LineChart>
        </div>
        <div style={{ flex: 1 }}>
          <h2>Watch Hours</h2>
          <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="watchHours" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </Card>
  );
};

export default Report;
