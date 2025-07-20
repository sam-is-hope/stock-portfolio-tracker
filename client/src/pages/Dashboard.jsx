import React, { useEffect, useState } from 'react';
import ChartComponent from '../components/ChartComponent';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/portfolio').then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h1>Portfolio Dashboard</h1>
      <ChartComponent data={data} />
    </div>
  );
};

export default Dashboard;
