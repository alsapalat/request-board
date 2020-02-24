import React from 'react';
import Card from '../components/Card.js';
import { useWebSocket } from 'hooks';

function DashboardContainer() {
  const [dashboard, setdashboard] = React.useState([
    {
      request: 3
    }
  ]);
  const refDashboard = React.useRef();
  const [isConnected] = useWebSocket(`${process.env.REACT_APP_WS}/ws`, (res) => {
    if (res.type === 'REQUEST_POSTED') {
      fetchRequest(res);
      return;
    }
    console.log('unhandled!', res);
  });

  const fetchRequest = ({ payload }) => {
    if (!payload) return;
    setdashboard(refDashboard.current.concat([payload]));
  };

  React.useEffect(() => {
    refDashboard.current = dashboard;
  }, [dashboard]);
  
  React.useEffect(() => {
    fetchRequest({});
  }, []);
  return (
    <div className="container-fluid">
      {isConnected ? 'CONNECTED' : '-'}
      <h1>Dashboard Container</h1>
      <div className="row h-25">
        <Card label="REQUEST" count={0}/>
        <Card label="LABEL 2" count={0}/>
        <Card label="LABEL 3" count={0}/>
      </div>
    </div>
  );
}

export default DashboardContainer;
