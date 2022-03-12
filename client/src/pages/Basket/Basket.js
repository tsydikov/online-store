import React, {useContext, useEffect, useState} from 'react';
import {Context} from '../../index';
import {Col, Row} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {deleteDeviceFromBasket, sendEmail} from '../../http/basketApi';
import BasketItem from './components/BasketItem/BasketItem';
import Summary from './components/Summary/Summary';
import {cleanBasket, fetchBasketDevice, getDevicesInfo, initialState} from './Busket.model';

const Basket = observer(() => {
  const {user, device} = useContext(Context)
  const [state, setState] = useState(initialState)

  useEffect(() => {
    fetchBasketDevice(user, device);
    // eslint-disable-next-line
  }, []);

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

  let amount = 0
  device.basket.forEach(device => amount = amount + device.amount * device.price)

  const confirm = async (e) => {
    e.preventDefault()
    let result = state
    result.amount = amount
    result.userId = user.user.id
    result.devices = getDevicesInfo(device)
    await sendEmail(result)
    console.log(result)
    await cleanBasket(setState, device, user.user.id)
  }

  return (
    <Row className="p-3">
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
    </Row>
  );
});

export default Basket;