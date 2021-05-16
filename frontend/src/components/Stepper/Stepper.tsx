import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Stepper = (props: any) => {

    return (
        <>
        <div id='progressbar' className='row justify-content-center align-items-center my-4'>
				<div className='col-4'>
					<CircularProgressbar maxValue={2} value={props.step} text={`${props.step}/2`} styles={buildStyles({
						pathColor: `rgba(243, 187, 128, 1)`,
						textColor: '#000000',
						trailColor: '#d6d6d6',
						backgroundColor: '#000000',
					})}/>
				</div>
				<div className='col-6'>
					<span style={{fontWeight:600}}> {props.title} </span>
					<p className='mb-0' style={{fontSize:14}}> {props.subtitle} </p>
				</div>
			</div>
        </>
    )
} 

export default Stepper;