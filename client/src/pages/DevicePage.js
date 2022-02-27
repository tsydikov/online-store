import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import star from '../assets/star.png'
import {REACT_APP_API_URL} from '../http/api';
import {fetchOneDevice} from '../http/deviceApi';
import {Context} from "../index";
import {putDeviceToBasket} from "../http/basketApi";

const DevicePage = () => {
  const {user} = useContext(Context)
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()
  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
  }, [id])
  const PutDeviceInToBasket = () => {
    putDeviceToBasket({id: device.id, userId: user.user.id})
      .then(() => alert(`device added to the basket`))
  }
  return (
    <Container className="mt-3">
      {device.img && <Row>
        <Col md={4}>
          <Image thumbnail src={REACT_APP_API_URL + device.img}/>
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center justify-content-center">
            <h2 style={{textAlign: 'center'}}>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${star}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: 'cover',
                fontSize: 48
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgrey'}}
          >
            <span>Цена</span>
            <h3 style={{color: "teal", fontSize: 36}}>{device.price} грн</h3>
            {user.isAuth && <Button
              variant={"outline-dark"}
              onClick={PutDeviceInToBasket}
            >
              Добавить в карзину
            </Button>}
          </Card>
        </Col>
      </Row>}
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info.map((info, index) =>
          <Row
            key={info.id}
            style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
          >
            {info.title}: {info.description}
          </Row>
        )}
      </Row>
    </Container>
  );
};

export default DevicePage;