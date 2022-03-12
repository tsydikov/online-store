import React, {useState} from 'react';
import {Button, Card, Col, Form, Modal, Row} from 'react-bootstrap';
import * as styles from './Summary.module.scss';
import {observer} from 'mobx-react-lite';

const Summary = ({ amount, state, setState, confirm}) => {
  const [makeOrder, setMakeOrder] = useState(false)
  const confirmOrder = (e) => {
    e.preventDefault()
    setMakeOrder(() => true)
    let error = false
    for (let key in state) {
      if (!state[key]) {
        error = true
      }
    }
    if (!error) confirm(e)
  }
  return (
    <Card border="black" className={styles.sum}>
      <Form>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Информация о получателе
          </Modal.Title>
        </Modal.Header>
        <br />
        <Form.Group className="mb-3" controlId="formBasicSurname">
          <Form.Label>Ваша фамилия</Form.Label>
          <Form.Control
            value={state.surname}
            onChange={e => setState({...state, surname: e.target.value})}
            type="text"
            placeholder="Введите фамилию"
            isInvalid={makeOrder && !state.surname}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Ваше имя</Form.Label>
          <Form.Control
            value={state.name}
            onChange={e => setState({...state, name: e.target.value})}
            type="text"
            placeholder="Введите имя"
            isInvalid={makeOrder && !state.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCity">
          <Form.Label>Город для доствки</Form.Label>
          <Form.Control
            value={state.city}
            onChange={e => setState({...state, city: e.target.value})}
            type="text"
            placeholder="Введите город для доставки"
            isInvalid={makeOrder && !state.city}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Номер отделения Новой Почты</Form.Label>
          <Form.Control
            value={state.number}
            onChange={e => setState({...state, number: e.target.value})}
            type="text"
            placeholder="Введите номер отделения"
            isInvalid={makeOrder && !state.number}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Ваш номер телефона</Form.Label>
          <Form.Control
            value={state.phone}
            onChange={e => setState({...state, phone: e.target.value})}
            type="email"
            placeholder="Введите номер телефона"
            isInvalid={makeOrder && !state.phone}
          />
          <Form.Text className="text-muted">
            Мы перезвоним вам для подтверджения заказа.
          </Form.Text>
        </Form.Group>
        <Row className="p-4">
          <Col className={styles.sum__header}>Всего</Col>
          <Col className={styles.sum__price}>{amount} грн</Col>
        </Row>
        <Row>
          <Col className={styles.sum__button}>
            <Button
              variant="outline-dark"
              type="submit"
              onClick={confirmOrder}
            >
              Подтвердить заявку
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default observer(Summary)