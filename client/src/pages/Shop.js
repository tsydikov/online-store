import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import {Alert, Col, Container} from 'react-bootstrap';
import Row from "react-bootstrap/Row"
import {Context} from '..';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';
import TypeBar from '../components/TypeBar';
import {fetchDevices} from '../http/deviceApi';
import {fetchBrands} from "../http/brandApi";
import {fetchTypes} from "../http/typeApi";
import SearchByName from "../components/SearchByName";

const Shop = observer(() => {
    const {device, alert} = useContext(Context)
    useEffect(() => {
        fetchTypes()
            .then(data => device.setTypes(data))
        fetchBrands()
            .then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 10, '')
            .then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 10, device.search).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand, device, device.search, alert.alert])
    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    {alert.alert && <Alert variant="success">Success</Alert>}
                    <SearchByName />
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;