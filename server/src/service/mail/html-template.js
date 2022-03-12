module.exports = function getHtmlTemplate(orderDetails) {
  return `
          <div>
            <h1><span style="font-size: 18px;">Информация о заказе</span></h1>
            <div><span style="font-size: 14px;">Фамилия: ${orderDetails.surname}</span></div>
            <div><span style="font-size: 14px;">Имя: ${orderDetails.name}</span></div>
            <div><span style="font-size: 14px;">Город: ${orderDetails.city}</span></div>
            <div><span style="font-size: 14px;">Номер отделения новой почты: ${orderDetails.number}</span></div>
            <div><span style="font-size: 14px;">Контактный телефон: ${orderDetails.phone}</span></div>
            <div><span style="font-size: 12px;">Товары:</span></div>
            <table class="se-table-size-auto">
            <tbody>
              <tr>
                <td>
                  <div><span style="font-size: 14px;">имя:</span></div>
                </td>
                <td>
                  <div><span style="font-size: 14px;">количество:</span></div>
                </td>
              </tr>
              ${orderDetails.devices.map(device => `
              <tr>
                <td>
                  <div><span style="font-size: 14px;">${device.name}</span></div>
                </td>
                <td>
                  <div><span style="font-size: 14px;">${device.amount}</span></div>
                </td>
              </tr>`).join('')}
            </tbody>
          </table>
          <p><span style="font-size: 16px;"><strong>Сумма заказа: ${orderDetails.amount}</strong></span><br>
          </p>
          </div>
        `
}