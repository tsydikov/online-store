import React, {useContext} from 'react';
import {Context} from '..';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {NavLink, useHistory} from 'react-router-dom';
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from '../utils/constants';
import {Button} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';

const NavBar = observer(() => {
  const {user, device} = useContext(Context)
  const history = useHistory()
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    history.push(LOGIN_ROUTE)
    localStorage.setItem('token', null);
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{color: 'white'}} to={SHOP_ROUTE} onClick={() => device.setSearch('')}>На главную</NavLink>
        {user.isAuth ?
          (<Nav className="ml-auto" style={{color: 'white'}}>
            {user.user.role === 'ADMIN' && <Button
              variant="outline-light"
              onClick={() => history.push(ADMIN_ROUTE)}
              className="mx-3"
            >
              Админ панель
            </Button>}
            <Button
              variant="outline-light"
              onClick={() => history.push(BASKET_ROUTE)}
            >
              Корзина
            </Button>
            <Button
              variant="outline-light"
              onClick={() => logOut()}
              className="mx-3"
            >
              Выйти
            </Button>
          </Nav>)
          :
          <Nav className="ml-auto" style={{color: 'white'}}>
            <Button variant="outline-light" onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
          </Nav>
        }
      </Container>
    </Navbar>
  );
});

export default NavBar;