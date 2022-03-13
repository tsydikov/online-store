import {Button, Card, Col, Image, Row} from 'react-bootstrap';
import {REACT_APP_API_URL} from '../../../../http/api';
import React from 'react';
import * as styles from './Info.module.scss';

const Info = ({device, user, PutDeviceInToBasket}) => {
  return (
    <Row>
      <Col md={4}>
        <Image thumbnail src={REACT_APP_API_URL + device.img}/>
      </Col>
      <Col md={4}>
        <Row className="d-flex flex-column align-items-center justify-content-center">
          <h2 className="text-center" >{device.name}</h2>
          <div className={styles.rating} >
            {device.rating}
          </div>
        </Row>
      </Col>
      <Col md={4}>
        <Card className={styles.priceContainer}>
          <span>Цена</span>
          <h3 className={styles.priceContainer__price}>{device.price} грн</h3>
          {user.isAuth && <Button
            variant={'outline-dark'}
            onClick={PutDeviceInToBasket}
          >
            Добавить в карзину
          </Button>}
        </Card>
      </Col>
    </Row>
  )
}

export default Info