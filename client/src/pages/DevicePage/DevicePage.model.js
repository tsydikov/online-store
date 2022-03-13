export const initialState = {
  show: false,
  headerText: '',
  bodyText: '',
  variant: '',
}

export const successAlert = (alertVisible, setAlertVisible) => setAlertVisible({
  ...alertVisible,
  show: !alertVisible.show,
  variant: 'success',
  headerText: 'Товар добавлен в корзину',
  bodyText: 'Товар успешно добавлен в корзину, вы можете продожить ваши покупки или перейти в корзину и оформить доставку.'
})

export const errorAlert = (alertVisible, setAlertVisible) => setAlertVisible({
  ...alertVisible,
  show: !alertVisible.show,
  variant: 'danger',
  headerText: 'Товар не добавлен в корзину',
  bodyText: 'Скорее всего товар уже находиться в корзине.' +
    'Если хотите изменить количество товаров, вы можеьте сделать это в корзине.'
})

export const alertVisibleHandler = (alertVisible, setAlertVisible) => setAlertVisible({...alertVisible, show: !alertVisible.show})