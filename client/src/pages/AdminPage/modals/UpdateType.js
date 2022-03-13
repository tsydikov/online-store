import React, {useContext, useEffect, useState} from "react";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {fetchTypes, updateType} from "../../../http/typeApi";

const UpdateType = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    const [value, setValue] = useState('')
    useEffect(() => {
        fetchTypes().then((data) => device.setTypes(data));
    }, [onHide, device]);

    const updType = () => {
        updateType(device.selectedType.id, value).then(() => {
            onHide();
            setValue('')
            device.setSelectedType({})
        });
    };
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle variant="secondary">
                            {device.selectedType.name || "Выбирете тип"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map((type) => (
                                <Dropdown.Item
                                    onClick={() => {
                                        device.setSelectedType(type)
                                        setValue(type.name)
                                    }}
                                    key={type.id}
                                >
                                    {type.name}
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
                <Button variant="outline-dark" onClick={updType}>
                    Изменить
                </Button>
                <Button variant="outline-dark" onClick={() => {
                    onHide()
                    device.setSelectedType({})
                    setValue('')
                }}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateType;
