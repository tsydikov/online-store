import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../../../index';
import {Button, Col, Dropdown, Form, Image, Modal, Row} from 'react-bootstrap';
import SearchByName from '../../MainPage/components/Search/SearchByName';
import {deleteDevice, fetchOneDeviceByName} from '../../../http/deviceApi';
import {fetchTypes} from '../../../http/typeApi';
import {fetchBrands} from '../../../http/brandApi';
import {REACT_APP_API_URL} from '../../../http/api';

const DeleteDevice = observer(({show, onHide}) => {
  const {device} = useContext(Context)
  const [selectedDevice, setSelectedDevice] = useState({})
  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
  }, [device])
  useEffect(() => {
    device.setSelectedType({})
    device.setSelectedBrand({})
    setSelectedDevice({})
  }, [device, onHide])
  const findDevice = async () => {
    await fetchOneDeviceByName(device.search)
      .then((data) => {
        if (data === null) {
          alert('Файл с таким именем не найден')
        } else {
          setSelectedDevice(data)
          device.setSelectedType(device.types.find(type => type.id === data.typeId))
          device.setSelectedBrand(device.brands.find(brand => brand.id === data.brandId))
        }
      });
  }
  const delDevice = async () => {
    await deleteDevice(selectedDevice.id)
    onHide()
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SearchByName onSearch={findDevice}/>
        {selectedDevice.hasOwnProperty('name')
          && <Form>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle variant="secondary">
                {device.selectedType.name || 'тип'}
              </Dropdown.Toggle>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle variant="secondary">
                {device.selectedBrand.name || 'бренд'}
              </Dropdown.Toggle>
            </Dropdown>
            <Form.Control
              value={selectedDevice.name}
              className="mt-3"
              placeholder="Название устройства"
              disabled
            />
            <Form.Control
              value={selectedDevice.price}
              className="mt-3 mb-4"
              placeholder="Стоимость устройства"
              type="number"
              disabled
            />
            <Image thumbnail src={REACT_APP_API_URL + selectedDevice.img}/>
            <hr/>
            {selectedDevice.info.map(i =>
              <Row className="mt-4" key={i.id}>
                <Col md={6}>
                  <Form.Control
                    value={i.title}
                    placeholder="Введите название свойства"
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    value={i.description}
                    placeholder="Введите описание свойства"
                    disabled
                  />
                </Col>
              </Row>
            )}
          </Form>
        }
      </Modal.Body>
      <Modal.Footer>
        {selectedDevice.hasOwnProperty('name')
          && <Button variant="outline-dark" onClick={delDevice}>Удалить устройство</Button>
        }
        <Button variant="outline-dark" onClick={() => onHide()}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteDevice;