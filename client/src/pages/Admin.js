import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import DeleteBrand from "../components/modals/DeleteBrand";
import DeleteType from "../components/modals/DeleteType";
import UpdateBrand from "../components/modals/UpdateBrand";
import UpdateType from "../components/modals/UpdateType";
import UpdateDevice from "../components/modals/UpdateDevice";
import DeleteDevice from "../components/modals/DeleteDevice";

const Admin = observer(() => {
    const [visible, setVisible] = useState({
        createBrand: false,
        createType: false,
        createDevice: false,
        updateBrand: false,
        updateType: false,
        updateDevice: false,
        deleteBrand: false,
        deleteType: false,
        deleteDevice: false
    })
    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setVisible({...visible, createType: true})}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-2 p-2"
                onClick={() => setVisible({...visible, updateType: true})}
            >
                Изменить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-2 p-2"
                onClick={() => setVisible({...visible, deleteType: true})}
            >
                Удалить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setVisible({...visible, createBrand: true})}
            >
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-2 p-2"
                onClick={() => setVisible({...visible, updateBrand: true})}
            >
                Изменить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-2 p-2"
                onClick={() => setVisible({...visible, deleteBrand: true})}
            >
                Удалить бренд
            </Button>
            <Button
                onClick={() => setVisible({...visible, createDevice: true})}
                variant={"outline-dark"}
                className="mt-4 p-2"
            >
                Добавить устройство
            </Button>
            <Button
                onClick={() => setVisible({...visible, updateDevice: true})}
                variant={"outline-dark"}
                className="mt-2 p-2"
            >
                Изменить устройство
            </Button>
            <Button
                onClick={() => setVisible({...visible, deleteDevice: true})}
                variant={"outline-dark"}
                className="mt-2 p-2"
            >
                Удалить устройство
            </Button>
            <CreateBrand
                show={visible.createBrand}
                onHide={() => setVisible({...visible, createBrand: false})}
            />
            <CreateDevice
                show={visible.createDevice}
                onHide={() => setVisible({...visible, createDevice: false})}
            />
            <CreateType
                show={visible.createType}
                onHide={() => setVisible({...visible, createType: false})}
            />
            <DeleteType
                show={visible.deleteType}
                onHide={() => setVisible({...visible, deleteType: false})}
            />
            <DeleteBrand
                show={visible.deleteBrand}
                onHide={() => setVisible({...visible, deleteBrand: false})}
            />
            <UpdateBrand
                show={visible.updateBrand}
                onHide={() => setVisible({...visible, updateBrand: false})}
            />
            <UpdateType
                show={visible.updateType}
                onHide={() => setVisible({...visible, updateType: false})}
            />
            <UpdateDevice
                show={visible.updateDevice}
                onHide={() => setVisible({...visible, updateDevice: false})}
            />
            <DeleteDevice
                show={visible.deleteDevice}
                onHide={() => setVisible({...visible, deleteDevice: false})}
            />
        </Container>
    );
});

export default Admin;
