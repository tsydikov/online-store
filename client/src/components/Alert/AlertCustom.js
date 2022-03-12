import React from 'react';
import {Alert, Button } from 'react-bootstrap';
import * as styles from './AlertCustom.module.scss'

const AlertCustom = ({ show, setShow, headerText, bodyText, variant }) => {
  return (
    <Alert
      show={show}
      variant={variant}
      className={styles.container}
    >
      <Alert.Heading>{headerText}</Alert.Heading>
      <p>
        {bodyText}
      </p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button onClick={() => setShow(false)} variant="outline-success">
          Закрыть
        </Button>
      </div>
    </Alert>
  )
}

export default AlertCustom