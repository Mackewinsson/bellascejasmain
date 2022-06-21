import React, { useState, useEffect } from "react";
import {
	Col,
	Container,
	Row,
} from 'react-bootstrap';

const admin = (props) => {

	return (
		<Container fluid>
			<Row className="flex-xl-nowrap">
				<Col xs={ 12 } md={ 3 } lg={ 2 } />
				<Col xs={ 12 } md={ 9 } lg={ 10 }>
					<span>Hola</span>
				</Col>
			</Row>
		</Container>
	);
};

export default admin;