import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {deleteDeviceFromBasket, fetchBasket} from "../http/basketApi";
import {fetchOneDevice} from "../http/deviceApi";
import DeviceItem from "../components/DeviceItem";

const Basket = observer(() => {
    const {user, device} = useContext(Context)
    const fetchBasketDevice = () => {
        device.setBasket([])
        fetchBasket()
            .then((data) => data.map(item => user.user.id === item.basketId && fetchOneDevice(item.deviceId)
                .then(res => device.setBasket([...device.basket, res]))));
    }
    useEffect(() => {
        fetchBasketDevice();
        // eslint-disable-next-line
    }, [device]);
    const deleteItemFromBasket = (id, e) => {
        e.preventDefault()
        deleteDeviceFromBasket(id,user.user.id)
            .then(() => {
                return fetchBasketDevice()
            })
    }
    return (
        <Row className="d-flex p-3">
            {device.basket.map(device =>
                <DeviceItem key={device.id} device={device} deleteItem={deleteItemFromBasket}/>
            )}
        </Row>
    );
});

export default Basket;