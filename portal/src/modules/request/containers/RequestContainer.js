import React from 'react';
import { useWebSocket } from 'hooks';

function RequestContainer() {
  const [list, setList] = React.useState([]);
  const refList = React.useRef();
  const [isConnected] = useWebSocket(`${process.env.REACT_APP_WS}/ws`, (res) => {
    if (res.type === 'REQUEST_POSTED') {
      fetchRequest(res);
      return;
    }
    console.log('unhandled!', res);
  });
  const fetchRequest = ({ payload }) => {
    if (!payload) return;
    setList(refList.current.concat([payload]));
  };
  React.useEffect(() => {
    refList.current = list;
  }, [list]);
  React.useEffect(() => {
    fetchRequest({});
  }, []);
  return (
    <div>
      {isConnected ? 'CONNECTED' : '-'}
      <h1>Request Board</h1>
      <table>
        <thead>
          <tr>
            <th>Request</th>
            <th>Location</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((x, i) => (
            <tr>
              <td>{x.action}</td>
          <td>{x.building} - {x.room}</td>
              <td>{x.remarks}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestContainer;
