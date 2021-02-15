import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

const PlacePage = () => {

    const params = useParams();
    const history = useHistory();
    console.log(params)
    console.log(history)

    const goBackHandler = () => {
        history.goBack();
        console.log(history)
    }

    return (
        <div className='default-padding'>
            <button onClick={goBackHandler} > Click here to go back </button>
            <p> Place page works !</p>
        </div>
    )
}

export default PlacePage