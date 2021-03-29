import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import addLine from '@iconify-icons/ri/add-line';

const CreatePlan = (props: any) => {
	console.log('get it');
	const [show, setShow] = useState(props.show);

	const handleOpen = () => setShow(true)
	const handleClose = () => setShow(false);

	return (
		<>
			<Button className='option-button' onClick={handleOpen}>
				<Icon icon={addLine} width='32' />
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title> สร้างแผนใหม่ </Modal.Title>
				</Modal.Header>
				<Modal.Body>Testinggg</Modal.Body>
			</Modal>
		</>
	);
};

export default CreatePlan;
