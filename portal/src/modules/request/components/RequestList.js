import React, {useState} from 'react';
import RequestListItem from './RequestListItem';

function RequestList({items}) {
    const [activeItem, setActiveItem] = useState();

    const activeRow = item => (e) => {
        setActiveItem(item.id);
    }

    const resetActiveRow = () => (e) => {
        setActiveItem(null);
    }

    const updateItem = item => (e) => {
        console.log(`Update item ${item.id}`);
    }

    const deleteItem = item => (e) => {
        console.log(`Delete item ${item.id}123`);
    }
      
    return (
        <div className="border rounded-sm" style={{ minHeight:"700px"}}>
            {
                <table className="table">
                <thead>
                  <tr>
                    <th>Request</th>
                    <th>Location</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {
                        items.map(
                            item => <RequestListItem
                                item={item}
                                key={item.id}
                                isActive={activeItem === item.id}
                                editRow={activeRow(item)}
                                resetActiveRow={resetActiveRow()}
                                updateItem={updateItem(item)}
                                deleteItem={deleteItem(item)}
                            />
                        )
                    }
                {/* {list.map((x, i) => (
                  <tr>
                    <td>{x.request}</td>
                <td>{x.building} - {x.room}</td>
                    <td>{x.remarks}</td>
                    <td>{x.status}</td>
                  </tr>
                ))} */}
                </tbody>
              </table>
                // pools.map(item => <PoolListItem label={item.label} key={item.id} isActive={active === item.id} onClick={selectPool(item)}/>)
                
            }
        </div>
    )
}

export default RequestList
