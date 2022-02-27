import React, {useContext, useEffect, useState} from "react";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {fetchBrands, updateBrand} from "../../http/brandApi";
import {Context} from "../..";
import {observer} from "mobx-react-lite";

const UpdateBrand = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    const [value, setValue] = useState('')
    useEffect(() => {
        fetchBrands().then((data) => device.setBrands(data));
    }, [onHide, device]);

    const updBrand = () => {
        updateBrand(device.selectedBrand.id, value).then(() => {
            onHide();
            setValue('')
            device.setSelectedBrand({})
        });
    };
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить брэнд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle variant="secondary">
                            {device.selectedBrand.name || "Выбирете бренд"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map((brand) => (
                                <Dropdown.Item
                                    onClick={() => {
                                        device.setSelectedBrand(brand)
                                        setValue(brand.name)
                                    }}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={updBrand}>
                    Изменить
                </Button>
                <Button variant="outline-dark" onClick={() => {
                    onHide()
                    device.setSelectedBrand({})
                    setValue('')
                }}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateBrand;
