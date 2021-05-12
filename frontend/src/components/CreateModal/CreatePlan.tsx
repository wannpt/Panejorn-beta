import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import addLine from '@iconify-icons/ri/add-line';
import {
	BudgetOptionsConst,
	InputConst,
	AdultOptionsConst,
	ChildrenOptionsConst,
	ProvinceOptionsConst,
} from '../../constant/constantVar/CreatePlanOptions';
import { th } from 'date-fns/locale';
import { DateRangePicker } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import { useHistory } from 'react-router';
import Loading from '../Loading/Loading';

const CreatePlan = (props: any) => {
	const [show, setShow] = useState(props.show);
	const [input, setInput] = useState<any>(InputConst);
	const [startDate, setStartDate] = useState<any>();
	const [endDate, setEndDate] = useState<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<String>();
	const [showError, setShowError] = useState<boolean>(false);
	const handleOpen = () => setShow(true);
	const handleClose = () => setShow(false);
	const history = useHistory();

	const onChangeHandler = (e: any) => {
		const { target } = e;
		const { name } = target;
		const value = target.value;

		if (!startDate) {
			let today = new Date();
			setStartDate(today);
		}

		if (!endDate) {
			let today = new Date();
			let tomorrow = new Date(today);
			tomorrow.setDate(tomorrow.getDate() + 1);
			setEndDate(tomorrow);
		}

		// Budget
		if (name === 'budget') {
			BudgetOptionsConst.map((el) => {
				if (value === el.key)
					return setInput({
						...input,
						maxBudget: el.value.max,
						minBudget: el.value.min,
					});
				return true;
			});
		} else if (name === 'numberOfAdult') {
			AdultOptionsConst.map((el) => {
				if (value === el.key)
					return setInput({
						...input,
						[name]: el.value,
					});
				return true;
			});
		} else if (name === 'numberOfChildren') {
			ChildrenOptionsConst.map((el) => {
				if (value === el.key)
					return setInput({
						...input,
						[name]: el.value,
					});

				return true;
			});
		} else {
			setInput({
				...input,
				[name]: value,
			});
		}
	};

	const DateFormatter = (date: Date) => {
		let tempdate = date.toLocaleDateString('en-US');
		let temp = tempdate.split('/');
		if (temp[0].length === 1) {
			temp[0] = '0' + temp[0];
		}
		let res = temp[0] + '/' + temp[1] + '/' + temp[2];
		return res;
	};

	const SubmitHandler = () => {
		setShow(false);
		setIsLoading(true);

		let tempMin = input.minBudget * input.numberOfAdult;
		let tempMax = input.maxBudget * input.numberOfAdult;
		let payload = {
			...input,
			minBudget: tempMin,
			maxBudget: tempMax,
			startDate: DateFormatter(startDate),
			endDate: DateFormatter(endDate),
			type: 'auto',
			inputTagScores: [0.5, 0.5, 0.5, 0.5, 0.5],
			distance: 0.5,
			diversity: 0.5,
			startTime: 540,
			endTime: 1020,
		};

		fetch('/planCollection/plans', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(payload),
		})
			.then((res) => res.json())
			.then((result) => {
				setIsLoading(false);
				if (result.success) {
					history.push({
						pathname: '/planSelection',
						state: result,
					});
				} else {
					setErrorMessage(result.message);
					setShowError(true);
					setIsLoading(false);
				}
			});
	};

	return (
		<>
			<Loading isLoading={isLoading} creating={true} />
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
								{ProvinceOptionsConst.map((el) => {
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
							minimumLength={0}
							maximumLength={2}
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
								{BudgetOptionsConst.map((el) => {
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
										{AdultOptionsConst.map((el) => {
											return <option>{el.key}</option>;
										})}
									</Form.Control>
								</Form.Group>
							</div>
							<div className='col-6 pl-1'>
								<Form.Group controlId='numberOfChildren'>
									<Form.Label>เด็ก (คน)</Form.Label>
									<Form.Control as='select' name='numberOfChildren' onChange={onChangeHandler}>
										{ChildrenOptionsConst.map((el) => {
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
			<Modal show={showError} onHide={() => setShowError(false)} centered>
				<Modal.Header className='big-title' closeButton>
					{' '}
					เกิดข้อผิดพลาด ❌
				</Modal.Header>
				<Modal.Body className='modal-body-lg'>
					<div className='row'>
						<div className='col-12' style={{ whiteSpace: 'pre-wrap' }}>
							{' '}
							{errorMessage}
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default CreatePlan;
