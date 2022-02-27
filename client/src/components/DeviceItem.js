import React from 'react';
import {Button, Card, Col, Image} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {REACT_APP_API_URL} from '../http/api';
import {DEVICE_ROUTE} from '../utils/constants';
import RatingStar from "./RatingStar";

const DeviceItem = ({device, deleteItem}) => {
  const history = useHistory()
  return (
    <Col md={3} className={"mt-3"}>
      <Card border="light">
        <Image
          height={200}
          src={REACT_APP_API_URL + device.img}
          onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}
          style={{cursor: 'pointer'}}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div style={{color: "teal", fontSize: 28}}>{device.price} грн</div>
          <div className="d-flex align-items-center">
            <RatingStar deviceId={device.id}/>
            <div>{device.rating}</div>
          </div>

        </div>
        <div>{device.name}</div>
        {deleteItem && <Button
          className="mx-3"
          variant="outline-dark"
          onClick={(e) => {
            e.preventDefault()
            deleteItem(device.id, e)
          }
          }
        >
          Delete
        </Button>}
      </Card>
    </Col>
  );
};

export default DeviceItem;