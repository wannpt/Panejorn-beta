import React, { useState } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import addLine from '@iconify-icons/ri/add-line';
import { CreatingPlanType } from '../../constant/Types/PlanTypes';
import {
	BudgetOptionsConst,
	PeopleOptionsConst,
	ProvinceOptionsConst,
} from '../../constant/constantVar/CreatePlanOptions';
import { th } from 'date-fns/locale';
import { DateRangePicker } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import { ProvinceOptionType } from '../../constant/Types/OptionsTypes';

const CreatePlan = (props: any) => {
	console.log('get it');
	const [show, setShow] = useState(props.show);
	const [input, setInput] = useState<CreatingPlanType>();
	const [provinceOptions, setProvinceOptions] = useState<string[]>(ProvinceOptionsConst);
	const [budgetOptions, setBudgetOptions] = useState(BudgetOptionsConst);
	const [numberOfPeopleOptions, setNumberOfPeopleOptions] = useState(PeopleOptionsConst);
	const [startDate, setStartDate] = useState<any>();
	const [endDate, setEndDate] = useState<any>();
	const handleOpen = () => setShow(true);
	const handleClose = () => setShow(false);

	const SubmitHandler = () => {
		console.log('submit value', input);
	};

	return (
		<>
			<Button className='option-button' onClick={handleOpen}>
				<Icon icon={addLine} width='32' />
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header className='' closeButton>
					<Modal.Title className='col text-center color-text big-title'> สร้างแผนใหม่ </Modal.Title>
				</Modal.Header>
				<Modal.Body className='modal-body-bg'>
					<Form>
						{/* PlanName */}
						<Form.Group controlId='planName'>
							<Form.Label>ชื่อแผน</Form.Label>
							<Form.Control type='text' placeholder='ชื่อแผนเที่ยวของคุณ' className='input-textbox' />
						</Form.Group>
						{/* Place Selection */}
						<Form.Group controlId='place'>
							<Form.Label>จุดหมายปลายทาง</Form.Label>
							<Form.Control as='select'>
								{provinceOptions.map((el) => {
									return <option>{el}</option>;
								})}
							</Form.Control>
						</Form.Group>
						{/* datepicker */}
						<DateRangePicker
							startDate={startDate}
							endDate={endDate}
							onStartDateChange={setStartDate}
							onEndDateChange={setEndDate}
							minimumDate={new Date()}
							minimumLength={1}
							format='dd MMM yyyy'
							locale={th}
						>
							{({ startDateInputProps, endDateInputProps }) => (
								<div className='row no-gutter'>
									<div className='col-6 pr-1'>
										<span className='form-label mt-1 pb-2'>วันที่ไป</span>
										<input className={'form-control force-white-bg'} {...startDateInputProps} placeholder='วันที่ไป' />
									</div>
									<div className='col-6 pl-1'>
										<span className='form-label mt-1 pb-2'>วันที่กลับ</span>
										<input className={'form-control force-white-bg'} {...endDateInputProps} placeholder='วันที่กลับ' />
									</div>
								</div>
							)}
						</DateRangePicker>
						{/* Budget */}
						<Form.Group controlId='place' className='mt-3'>
							<Form.Label>งบประมาน (ต่อคน)</Form.Label>
							<Form.Control as='select'>
								{budgetOptions.map((el) => {
									return <option>{el.key}</option>;
								})}
							</Form.Control>
						</Form.Group>

						{/* Number of people */}
						<div className='row'>
							<div className='col-6 pr-1'>
								<Form.Group controlId='place'>
									<Form.Label>ผู้ใหญ่ (คน)</Form.Label>
									<Form.Control as='select'>
										{numberOfPeopleOptions.map((el) => {
											return <option>{el.key}</option>;
										})}
									</Form.Control>
								</Form.Group>
							</div>
							<div className='col-6 pl-1'>
								<Form.Group controlId='place'>
									<Form.Label>เด็ก (คน)</Form.Label>
									<Form.Control as='select'>
										{numberOfPeopleOptions.map((el) => {
											return <option>{el.key}</option>;
										})}
									</Form.Control>
								</Form.Group>
							</div>
						</div>

						{/* Submit */}
						<Button className='gradient-background submit-btn btn' type='submit'>
							สร้างแผนอัตโนมัติ
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default CreatePlan;
