import {deleteDeviceFromBasket, fetchBasket} from '../../http/basketApi';
import {fetchOneDevice} from '../../http/deviceApi';

export const initialState = {
  name:'',
  surname:'',
  city:'',
  number:'',
  phone:'',
}

export const alertHeader = 'Ваш заказ отправлен'
export const alertText = 'Информация о вашем заказе отправленна. Скоро с вамя свяжуться.'

export const fetchBasketDevice = (user, device) => {
  device.setBasket([])
  fetchBasket()
    .then((data) => data.map(item => user.user.id === item.basketId && fetchOneDevice(item.deviceId)
      .then(res => {
        res.amount = 1
        return device.setBasket([...device.basket, res])
      })));
}

export const getDevicesInfo = (device) => {
  return device.basket.map(device => {
    return {
      name: device.name,
      amount: device.amount
    }
  })
}

export const cleanBasket = async (setState, device, userID) => {
  setState(initialState)
  for (const element of device.basket) {
    await deleteDeviceFromBasket(element.id, userID)
  }
  device.setBasket([])
}