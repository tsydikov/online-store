import React, {useContext, useState} from 'react';
import {Container, Form} from 'react-bootstrap';
import {NavLink, useHistory, useLocation} from 'react-router-dom';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from '../../utils/constants';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {observer} from 'mobx-react-lite';
import {Context} from '../../index';
import * as styles from './Auth.module.scss';
import AlertCustom from '../../components/Alert/AlertCustom';
import * as model from './Auth.model';

const Auth = observer(() => {
  const {user} = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(model.alertVisibleInitialState);
  const submit = async () => {
    await model.submitForm({
      location: location.pathname,
      email,
      password,
      alertVisible,
      setAlertVisible,
      user,
      history
    })
  }

  return (
    <div>
      {alertVisible.show && <AlertCustom
        show={alertVisible.show}
        setShow={() => setAlertVisible({...alertVisible, show: !alertVisible.show})}
        headerText={alertVisible.headerText}
        bodyText={alertVisible.bodyText}
        variant={alertVisible.variant}
      />
      }
      <Container className={styles.container}>
        <Card className={styles.container__card}>
          <h2 className="m-auto">
            {model.isLogin(location.pathname)
              ? 'Авторизация'
              : 'Регистрация'
            }
          </h2>
          <Form className="d-flex flex-column">
            <Form.Control
              className="mt-3"
              placeholder="Введите email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control
              className="mt-3"
              placeholder="Введите ваш пароль..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <Row
              className="d-flex justify-content-between mt-3 pl-3 pr-3"
              xs="auto"
            >
              {model.isLogin(location.pathname) ? (
                <div>
                  нет акаунта?{' '}
                  <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                </div>
              ) : (
                <div>
                  Естьнет акаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                </div>
              )}
              <Button variant={'outline-dark'} onClick={submit}>
                {model.isLogin(location.pathname)
                  ? 'Войти'
                  : 'Регистрация'
                }
              </Button>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>
  );
});

export default Auth;
