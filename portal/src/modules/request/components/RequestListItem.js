
import React, { useEffect, useState } from 'react'
import _ from 'lodash';

function RequestListItem({item, isActive, editRow, resetActiveRow, updateItem, deleteItem}) {
    const [payload, setPayload] = useState({
        request: item.request,
        building: item.building,
        room: item.room,
        remarks: item.remarks
    });

    const [editable, setEditable] = useState(false);

    const handleChange = (e) => {
        setPayload({...payload, [e.target.name]: e.target.value});
    }

    const handleUpdate = item => (e) => {
        updateItem(payload);
    }

    const handleEdit = item => (e) => {;
        editRow(item.id);
    }

    const handleCancel = item => (e) => {;
        resetActiveRow();
    }

    const handleDelete = item => (e) => {
        deleteItem(item);
    }

    useEffect(() => {
    }, [isActive]);

    if (isActive) {
        return (
            <tr>
                <td>
                    <input type="text" name="request" value={payload.request} onChange={handleChange}/>
                </td>
                <td>
                    <input type="text" name="building" value={payload.building} onChange={handleChange}/> -
                    <input type="text" name="room" value={payload.room} onChange={handleChange}/>
                </td>
                <td>
                    <input type="text" name="remarks" value={payload.remarks} onChange={handleChange}/>
                </td>
                <td>
                    <div className="list-inline">
                        <button type="button" className="btn mr-1 btn-primary" onClick={handleUpdate(item)}>Save</button>
                        <button type="button" className="btn btn-dark" onClick={handleCancel(item)}>Cancel</button>
                    </div>
                </td>
            </tr>
        );
    }
    return (
        <tr>
            <td>{item.request}</td>
            <td>{item.building} - {item.room}</td>
            <td>{item.remarks}</td>
            <td>
                <div className="list-inline">
                    <button type="button" className="btn mr-1 btn-success" onClick={handleEdit(item)}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={handleDelete(item)}>Delete</button>
                </div>
            </td>
        </tr>
    );
}

export default RequestListItem
