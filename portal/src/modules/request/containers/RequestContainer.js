import React, { useState } from 'react';
import { useWebSocket } from 'hooks';
import RequestList from '../components/RequestList'

function RequestContainer() {
  const [items, setItems] = React.useState([
    {
      id: 1,
      request: 'water',
      building: 'NEW',
      room: 'RND',
      remarks: 'Remarks Here',
    },
    {
      id: 2,
      request: 'water',
      building: 'NEW',
      room: 'GYM',
      remarks: 'Remarks Here',
    },
    {
      id: 3,
      request: 'water',
      building: 'NEW',
      room: 'CHURCH',
      remarks: 'Remarks Here',
    }
  ]);
  const [activeItem, setActiveItem] = useState({});
  // const [active, setActive] = useState('');

  const refList = React.useRef();
  // const [isConnected] = useWebSocket(`${process.env.REACT_APP_WS}/ws`, (res) => {
  //   if (res.type === 'REQUEST_POSTED') {
  //     fetchRequest(res);
  //     return;
  //   }
  //   console.log('unhandled!', res);
  // });

  const fetchRequest = ({ payload }) => {
    if (!payload) return;
    setItems(refList.current.concat([payload]));
  };

  React.useEffect(() => {
    refList.current = items;
  }, [items]);
  
  React.useEffect(() => {
    fetchRequest({});
  }, []);
  return (
    <div>
      {/* {isConnected ? 'CONNECTED' : '-'} */}
      <h1>Request Board</h1>
      <RequestList 
        items={items}
        active={activeItem}
      />
    </div>
  );
}

export default RequestContainer;
