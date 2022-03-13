import {LOGIN_ROUTE, SHOP_ROUTE} from '../../utils/constants';
import {login, registration} from '../../http/userApi';

export const isLogin = (location) => location === LOGIN_ROUTE;
export const alertVisibleInitialState = {
  show: false,
  headerText: 'Ошибка',
  bodyText: '',
  variant: 'danger',
}

export const submitForm = async ({
                              location,
                              email,
                              password,
                              alertVisible,
                              setAlertVisible,
                              user,
                              history
}) => {
  try {
    let userData;
    if (isLogin(location)) {
      userData = await login(email, password);
    } else {
      userData = await registration(email, password);
    }
    user.setUser(userData);
    user.setIsAuth(true);
    history.push(SHOP_ROUTE);
  } catch (e) {
    setAlertVisible({
      ...alertVisible,
      show: !alertVisible.show,
      bodyText: e.response.data.message
    })
  }
};