import {Button, Row, Col} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import * as styles from '../BasketItem.module.scss'

const Amount = ({amount, setBasketDeviceAmount}) => {
  const increase = () => setBasketDeviceAmount(1)
  const decrease = () => setBasketDeviceAmount(-1)
  return (
      <Row xs="auto">
        <Col>
          <Button
            variant="outline-dark"
            onClick={decrease}
          >
          -
        </Button></Col>
        <Col className={styles.basketDevice__amount}>
          {amount}
        </Col>
        <Col>
          <Button
            variant="outline-dark"
            onClick={increase}
          >
          +
        </Button></Col>
      </Row>
  )
}

export default observer(Amount)