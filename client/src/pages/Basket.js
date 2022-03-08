import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {deleteDeviceFromBasket, fetchBasket} from "../http/basketApi";
import {fetchOneDevice} from "../http/deviceApi";
import BasketItem from '../components/BasketItem/index';

const Basket = observer(() => {
    const {user, device} = useContext(Context)
    const fetchBasketDevice = () => {
        device.setBasket([])
        fetchBasket()
            .then((data) => data.map(item => user.user.id === item.basketId && fetchOneDevice(item.deviceId)
                .then(res => {
                    res.amount = 1
                    return device.setBasket([...device.basket, res])
                })));
    }
    useEffect(() => {
        fetchBasketDevice();
        // eslint-disable-next-line
    }, []);
    const deleteItemFromBasket = (id) => {
        deleteDeviceFromBasket(id,user.user.id)
            .then(() => {
                return fetchBasketDevice()
            })
    }
    const updateDeviceAmount = (updatedDevice) => {
      console.log(updatedDevice)
      device.basket.map(device => device.id === updatedDevice.id
      ? updatedDevice
      : device)
      device.setBasket([...device.basket])
    }
    return (
        <Row className="d-flex p-3">
            {device.basket.map(device =>
                <BasketItem
                  key={device.id}
                  device={device}
                  deleteItem={deleteItemFromBasket}
                  setBasketDevice={updateDeviceAmount}
                />
            )}
        </Row>
    );
});

export default Basket;