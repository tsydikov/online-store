import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const SearchByName = observer(({onSearch}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const onEnter = (e) => {
        if (e.key === 'Enter') {
            e.stopPropagation()
            e.preventDefault()
            if (name === '') {
                alert('Введите имя');
                return;
            }
            device.setSearch(name)
            if (onSearch) {
                onSearch()
            }
        }
    }
    const onButtonClick = () => {
        if (name === '') {
            alert('Введите имя');
            return;
        }
        device.setSearch(name)
        if (onSearch) {
            onSearch()
        }
    }
    return (
        <div>
            <Form className="d-flex mt-2">
                <Form.Control
                    value={name}
                    onChange={e => setName(e.target.value)}
                    // type="search"
                    placeholder="Введите название устройства"
                    className="me-2"
                    // aria-label="Search"
                    onKeyDown={onEnter}
                />
                <Button variant="dark" onClick={onButtonClick}>Найти</Button>
            </Form>
        </div>
    );
});

export default SearchByName;