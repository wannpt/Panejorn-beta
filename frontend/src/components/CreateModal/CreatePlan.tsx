import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import addLine from '@iconify-icons/ri/add-line';
import {
	BudgetOptionsConst,
	InputConst,
	PeopleOptionsConst,
	ProvinceOptionsConst,
} from '../../constant/constantVar/CreatePlanOptions';
import { th } from 'date-fns/locale';
import { DateRangePicker } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import { useHistory } from 'react-router';



const CreatePlan = (props: any) => {
	const [show, setShow] = useState(props.show);
	const [input, setInput] = useState<any>(InputConst);
	const [provinceOptions, setProvinceOptions] = useState<string[]>(ProvinceOptionsConst);
	const [budgetOptions, setBudgetOptions] = useState(BudgetOptionsConst);
	const [numberOfPeopleOptions, setNumberOfPeopleOptions] = useState(PeopleOptionsConst);
	const [startDate, setStartDate] = useState<any>();
	const [endDate, setEndDate] = useState<any>();
	const handleOpen = () => setShow(true);
	const handleClose = () => setShow(false);
	const history = useHistory()

	const onChangeHandler = (e: any) => {
		const { target } = e;
		const { name } = target;
		const value = target.value;

		// Budget
		if (name === 'budget') {
			budgetOptions.map((el) => {
				if (value === el.key)
					return setInput({
						...input,
						maxBudget: el.value.max,
						minBudget: el.value.min,
					});
			});
		} else if (name === 'numberOfAdult' || name === 'numberOfChildren') {
			numberOfPeopleOptions.map((el) => {
				if (value === el.key)
					return setInput({
						...input,
						[name]: el.value,
					});
			});
		} else {
			setInput({
				...input,
				[name]: value,
			});
		}
	};

	const DateFormatter = (date: Date) => {
		let res = date.toLocaleDateString();
		return res
	}

	const SubmitHandler = () => {

		setShow(false)
		const payload = {
			...input,
			startDate: DateFormatter(startDate),
			endDate: DateFormatter(endDate)
		}
		console.log('submit value => ', payload);
		
	
		history.push({
			pathname:'/planSelection',
			state: payload
		})
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
							<Form.Control
								name='planName'
								type='text'
								placeholder='ชื่อแผนเที่ยวของคุณ'
								className='input-textbox'
								onChange={onChangeHandler}
							/>
						</Form.Group>
						{/* Place Selection */}
						<Form.Group controlId='place'>
							<Form.Label>จุดหมายปลายทาง</Form.Label>
							<Form.Control as='select' onChange={onChangeHandler} name='province' defaultValue={'กรุงเทพมหานคร'}>
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
										<input
											className={'form-control force-white-bg'}
											{...startDateInputProps}
											placeholder='วันที่ไป'
											name='startDate'
											onChange={onChangeHandler}
										/>
									</div>
									<div className='col-6 pl-1'>
										<span className='form-label mt-1 pb-2'>วันที่กลับ</span>
										<input
											className={'form-control force-white-bg'}
											{...endDateInputProps}
											placeholder='วันที่กลับ'
											name='endDate'
											onChange={onChangeHandler}
										/>
									</div>
								</div>
							)}
						</DateRangePicker>
						{/* Budget */}
						<Form.Group controlId='budget' className='mt-3'>
							<Form.Label>งบประมาน (ต่อคน)</Form.Label>
							<Form.Control as='select' name='budget' onChange={onChangeHandler}>
								{budgetOptions.map((el) => {
									return <option>{el.key}</option>;
								})}
							</Form.Control>
						</Form.Group>

						{/* Number of people */}
						<div className='row'>
							<div className='col-6 pr-1'>
								<Form.Group controlId='numberOfAdult'>
									<Form.Label>ผู้ใหญ่ (คน)</Form.Label>
									<Form.Control as='select' name='numberOfAdult' onChange={onChangeHandler}>
										{numberOfPeopleOptions.map((el) => {
											return <option>{el.key}</option>;
										})}
									</Form.Control>
								</Form.Group>
							</div>
							<div className='col-6 pl-1'>
								<Form.Group controlId='numberOfChildren'>
									<Form.Label>เด็ก (คน)</Form.Label>
									<Form.Control as='select' name='numberOfChildren' onChange={onChangeHandler}>
										{numberOfPeopleOptions.map((el) => {
											return <option>{el.key}</option>;
										})}
									</Form.Control>
								</Form.Group>
							</div>
						</div>

						{/* Submit */}
						<Button className='gradient-background submit-btn btn' onClick={SubmitHandler}>
							สร้างแผนอัตโนมัติ
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default CreatePlan;
