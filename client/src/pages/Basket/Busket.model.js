import {deleteDeviceFromBasket, fetchBasket} from '../../http/basketApi';
import {fetchOneDevice} from '../../http/deviceApi';

export const fetchBasketDevice = (user, device) => {
  device.setBasket([])
  fetchBasket()
    .then((data) => data.map(item => user.user.id === item.basketId && fetchOneDevice(item.deviceId)
      .then(res => {
        res.amount = 1
        return device.setBasket([...device.basket, res])
      })));
}

export const initialState = {
  name:'',
  surname:'',
  city:'',
  number:'',
  phone:'',
}

export const getDevicesInfo = (device) => {
  const devices = device.basket.map(device => {
    return {
      name: device.name,
      amount: device.amount
    }
  })
  return devices
}

export const cleanBasket = async (setState, device, userID) => {
  setState(initialState)
  for (const element of device.basket) {
    await deleteDeviceFromBasket(element.id, userID)
  }
  device.setBasket([])
}