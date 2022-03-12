import React, {useContext, useEffect, useState} from 'react';
import {Context} from '../../index';
import {Col, Row} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {deleteDeviceFromBasket, sendEmail} from '../../http/basketApi';
import BasketItem from './components/BasketItem/BasketItem';
import Summary from './components/Summary/Summary';
import {alertHeader, alertText, cleanBasket, fetchBasketDevice, getDevicesInfo, initialState} from './Busket.model';
import * as styles from './Basket.module.scss'
import AlertCustom from '../../components/Alert/AlertCustom';

const Basket = observer(() => {
  const {user, device} = useContext(Context)
  const [state, setState] = useState(initialState)
  const [show, setShow] = useState(false);

  let amount = 0
  device.basket.forEach(device => amount = amount + device.amount * device.price)

  useEffect(() => {
    fetchBasketDevice(user, device);
  }, [user, device]);

  const deleteItemFromBasket = (id) => {
    deleteDeviceFromBasket(id, user.user.id)
      .then(() => {
        return fetchBasketDevice(user, device)
      })
  }
  const updateDeviceAmount = (updatedDevice) => {
    device.basket.map(device => device.id === updatedDevice.id
      ? updatedDevice
      : device)
    device.setBasket([...device.basket])
  }

  const confirm = async () => {
    let result = state
    result.amount = amount
    result.userId = user.user.id
    result.devices = getDevicesInfo(device)
    await sendEmail(result)
    await cleanBasket(setState, device, user.user.id)
    setShow(value => !value)
  }

  return (
    <div>
      {show && <AlertCustom
        show={show}
        setShow={setShow}
        headerText={alertHeader}
        bodyText={alertText}
        variant="success"
      />
      }
      {
        device.basket.length
          ? (<Row className="m-3">
            <Col sm={8}>
              {device.basket.map(device =>
                <BasketItem
                  key={device.id}
                  device={device}
                  deleteItem={deleteItemFromBasket}
                  setBasketDevice={updateDeviceAmount}
                />
              )}
            </Col>
            <Col sm={4}>
              <Summary amount={amount} state={state} setState={setState} confirm={confirm}/>
            </Col>
          </Row>)
          : <Col className={styles.empty}>Ваша корзина пуста</Col>
      }
    </div>
  );
});

export default Basket;