import React, {useContext, useEffect} from 'react';
import {Button, Dropdown, Form, Modal} from 'react-bootstrap';
import {deleteType, fetchTypes} from '../../../http/typeApi';
import {Context} from '../../../index';
import {observer} from 'mobx-react-lite';

const DeleteType = observer(({show, onHide}) => {
  const {device} = useContext(Context);
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
  }, [onHide, device]);
  const delType = async () => {
    await deleteType(device.selectedType.id)
    device.selectedType.name = null
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle variant="secondary">
              {device.selectedType.name || 'Выбирете тип'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-dark" onClick={delType}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteType;
