import React from 'react';
import {Button, Card, Col, Image} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {REACT_APP_API_URL} from '../../http/api';
import {DEVICE_ROUTE} from '../../utils/constants';
import * as styles from './BasketItem.module.scss'
import Row from 'react-bootstrap/Row';
import Amount from './components/Amount';

const BasketItem = ({device, deleteItem, setBasketDevice}) => {
  const history = useHistory()
  const removeItem = (e) => {
    e.preventDefault()
    deleteItem(device.id)
  }
  const setBasketDeviceAmount = (newAmount) => {
    const updatedAmount = device.amount + newAmount
    if (updatedAmount === 0) return deleteItem(device.id)
    device.amount = updatedAmount
    setBasketDevice(device)
  }
  return (
    <Col md={8}>
      <Card border="black" className={styles.basketDevice}>
        <Image
          className={styles.basketDevice__img}
          src={REACT_APP_API_URL + device.img}
          onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}
        />
        <Row xs={1} md={2}>
          <Col className={styles.basketDevice__name}>{device.name}</Col>
          <Col className={styles.basketDevice__price}>{device.price} грн</Col>
          <Col>
            <Amount
              amount={device.amount}
              setBasketDeviceAmount={setBasketDeviceAmount}
            />
          </Col>
        </Row>
        <Button
          className={styles.basketDevice__delete}
          variant="outline-dark"
          onClick={removeItem}
        >
          X
        </Button>
      </Card>
    </Col>
  );
};

export default BasketItem;