import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Context } from '../../../../index';


const BrandBar = observer(() => {
    const { device } = useContext(Context)
    return (
        <Row xs="auto"> 
            {device.brands.map(brand =>
                <Card
                style={{cursor:'pointer'}}
                key={brand.id}
                className="p-3"
                onClick={() =>
                    brand.id === device.selectedBrand.id
                        ?
                        device.setSelectedBrand({})
                        :
                        device.setSelectedBrand(brand)
                }
                border={brand.id === device.selectedBrand.id ? 'dark' : 'light'}
                >
                    {brand.name}
                </Card>    
            )}
        </Row>
    );
});

export default BrandBar;