import React, {useContext, useEffect, useState} from 'react';
import {Container, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {fetchOneDevice} from '../../http/deviceApi';
import {Context} from '../../index';
import {putDeviceToBasket} from '../../http/basketApi';
import AlertCustom from '../../components/Alert/AlertCustom';
import * as model from './DevicePage.model';
import Characteristics from './components/Сharacteristics/Сharacteristics';
import Info from './components/Info/Info';

const DevicePage = () => {
  const {user} = useContext(Context)
  const [device, setDevice] = useState({info: []})
  const [alertVisible, setAlertVisible] = useState(model.initialState);
  const {id} = useParams()

  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
  }, [id])
  const PutDeviceInToBasket = () => {
    putDeviceToBasket({id: device.id, userId: user.user.id})
      .then(() => model.successAlert(alertVisible, setAlertVisible))
      .catch(() => model.errorAlert(alertVisible, setAlertVisible))
  }
  return (
    <div>
      {alertVisible.show && <AlertCustom
        show={alertVisible.show}
        setShow={() => model.alertVisibleHandler(alertVisible, setAlertVisible)}
        headerText={alertVisible.headerText}
        bodyText={alertVisible.bodyText}
        variant={alertVisible.variant}
      />
      }
      <Container className="mt-3">
        {device.img &&
          <Info
            device={device}
            user={user}
            PutDeviceInToBasket={PutDeviceInToBasket}
          />
        }
        <Row className="d-flex flex-column m-3">
          <h1>Характеристики</h1>
          {device.info.map((info, index) =>
            <Characteristics
              id={info.id}
              title={info.title}
              description={info.description}
              index={index}
            />
          )}
        </Row>
      </Container>
    </div>
  );
};

export default DevicePage;