import React, {useContext, useEffect} from 'react';
import {Button, Dropdown, Form, Modal} from 'react-bootstrap';
import {deleteBrand, fetchBrands} from '../../../http/brandApi';
import {Context} from '../../../index';
import {observer} from 'mobx-react-lite';

const DeleteBrand = observer(({show, onHide}) => {
  const {device} = useContext(Context);
  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data));
  }, [onHide, device]);

  const delBrand = async () => {
    await deleteBrand(device.selectedBrand.id)
    device.selectedBrand.name = null
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить брэнд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle variant="secondary">
              {device.selectedBrand.name || 'Выбирете бренд'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
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
        <Button variant="outline-dark" onClick={delBrand}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteBrand;
