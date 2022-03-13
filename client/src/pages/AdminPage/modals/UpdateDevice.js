import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Image, Modal, Row} from 'react-bootstrap';
import {Context} from '../../../index';
import {fetchOneDeviceByName, updateDevice} from '../../../http/deviceApi';
import {fetchBrands} from '../../../http/brandApi';
import {fetchTypes} from '../../../http/typeApi';
import {REACT_APP_API_URL} from '../../../http/api';
import SearchByName from '../../MainPage/components/Search/SearchByName';

const UpdateDevice = observer(({show, onHide}) => {
  const {device} = useContext(Context)
  const [editDevice, setEditDevice] = useState({})
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
  }, [device])

  useEffect(() => {
    device.setSelectedType({})
    device.setSelectedBrand({})
    setEditDevice({})
  }, [device, onHide])

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', id: Date.now()}])
  }
  const removeInfo = (id) => {
    setInfo(info.filter(i => i.id !== id))
  }
  const changeInfo = (key, value, id) => {
    setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
  }
  const selectFile = e => {
    setFile(e.target.files[0]);
  }
  const updDevice = async () => {
    const formData = new FormData()
    formData.append('id', editDevice.id)
    formData.append('name', name)
    formData.append('price', `${price}`)
    if (file === null) {
      formData.append('img', editDevice.img)
    } else formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    await updateDevice(editDevice.id, formData)
    onHide()
  }
  const findDevice = async () => {
    await fetchOneDeviceByName(device.search)
      .then((data) => {
        if (data === null) {
          alert('Файл с таким именем не найден')
        } else {
          setEditDevice(data);
          setName(device.search)
          device.setSelectedType(device.types.find(type => type.id === data.typeId))
          device.setSelectedBrand(device.brands.find(brand => brand.id === data.brandId))
          setPrice(data.price)
          setInfo(data.info);
        }
      });
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
          Изменить товар
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!editDevice.hasOwnProperty('name')
          ? <SearchByName onSearch={findDevice}/>
          : <Form>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle
                variant="secondary">{device.selectedType.name || 'Выбирете тип'}</Dropdown.Toggle>
              <Dropdown.Menu>
                {device.types.map(type =>
                  <Dropdown.Item
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                  >
                    {type.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle
                variant="secondary">{device.selectedBrand.name || 'Выбирете бренд'}</Dropdown.Toggle>
              <Dropdown.Menu>
                {device.brands.map(brand =>
                  <Dropdown.Item
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                  >
                    {brand.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-3"
              placeholder="Введите название устройства"
            />
            <Form.Control
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="mt-3 mb-4"
              placeholder="Введите стоимость устройства"
              type="number"
            />
            <Image thumbnail src={REACT_APP_API_URL + editDevice.img}/>
            <Form.Label className="mt-3">Выберете новую картинку</Form.Label>
            <Form.Control
              type="file"
              onChange={selectFile}
            />
            <hr/>
            <Button
              variant="outline-dark"
              onClick={addInfo}
            >
              Добавить новое свойство
            </Button>
            {info.map(i =>
              <Row className="mt-4" key={i.id}>
                <Col md={4}>
                  <Form.Control
                    onChange={(e) => changeInfo('title', e.target.value, i.id)}
                    value={i.title}
                    placeholder="Введите название свойства"
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    value={i.description}
                    onChange={(e) => changeInfo('description', e.target.value, i.id)}
                    placeholder="Введите описание свойства"
                  />
                </Col>
                <Col md={4}>
                  <Button
                    variant="outline-dark"
                    onClick={() => removeInfo(i.id)}
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>
            )}
          </Form>}
      </Modal.Body>
      <Modal.Footer>
        {editDevice.hasOwnProperty('name')
          && <Button variant="outline-dark" onClick={updDevice}>Сохранить изменения</Button>
        }
        <Button variant="outline-dark" onClick={() => onHide()}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default UpdateDevice;