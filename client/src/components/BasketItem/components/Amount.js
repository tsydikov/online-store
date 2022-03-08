import {Button, Row, Col} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';

const Amount = ({amount, setBasketDeviceAmount}) => {
  const increase = () => setBasketDeviceAmount(1)
  const decrease = () => setBasketDeviceAmount(-1)
  return (
      <Row xs="auto">
        <Col>
          <Button
            variant="outline-dark"
            onClick={increase}
          >
          +
        </Button></Col>
        <Col style={{fontSize: 24}}>{amount}</Col>
        <Col>
          <Button
            variant="outline-dark"
            onClick={decrease}
          >
          -
        </Button></Col>
      </Row>
  )
}

export default observer(Amount)