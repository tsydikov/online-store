import React from 'react';
import {Card, Col, Image} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {REACT_APP_API_URL} from '../../../../http/api';
import {DEVICE_ROUTE} from '../../../../utils/constants';
import RatingStar from '../../../../components/Rating/RatingStar';
import * as styles from './Device.module.scss';

const DeviceItem = ({device}) => {
  const history = useHistory()

  return (
    <Col md={3} className={'mt-3'}>
      <Card
        border="light"
        className={styles.imgContainer}
        onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}
      >
        <div>
          <Image
            className={styles.img}
            src={REACT_APP_API_URL + device.img}
          />
        </div>
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div className={styles.price}>{device.price} грн</div>
          <div className="d-flex align-items-center">
            <RatingStar deviceId={device.id}/>
            <div>{device.rating}</div>
          </div>

        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;