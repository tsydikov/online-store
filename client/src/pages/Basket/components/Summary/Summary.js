import React from 'react';
import {Button, Card, Col, Form, Modal, Row} from 'react-bootstrap';
import * as styles from './Summary.module.scss';
import {observer} from 'mobx-react-lite';

const Summary = ({ amount, state, setState, confirm}) => {
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
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Ваше имя</Form.Label>
          <Form.Control
            value={state.name}
            onChange={e => setState({...state, name: e.target.value})}
            type="text"
            placeholder="Введите имя"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCity">
          <Form.Label>Город для доствки</Form.Label>
          <Form.Control
            value={state.city}
            onChange={e => setState({...state, city: e.target.value})}
            type="text"
            placeholder="Введите город для доставки"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Номер отделения Новой Почты</Form.Label>
          <Form.Control
            value={state.number}
            onChange={e => setState({...state, number: e.target.value})}
            type="text"
            placeholder="Введите номер отделения"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Ваш номер телефона</Form.Label>
          <Form.Control
            value={state.phone}
            onChange={e => setState({...state, phone: e.target.value})}
            type="email"
            placeholder="Введите номер телефона"
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
              onClick={e => confirm(e)}
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