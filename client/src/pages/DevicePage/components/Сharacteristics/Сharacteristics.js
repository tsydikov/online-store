import {Row} from 'react-bootstrap';
import React from 'react';
import * as styles from './Characteristics.module.scss';

const Characteristics = ({id, title, description, index}) => {
  return (
    <Row
      key={id}
      className={index % 2 === 0 ? styles.grey : styles.white}
    >
      {title}: {description}
    </Row>
  )
}

export default Characteristics