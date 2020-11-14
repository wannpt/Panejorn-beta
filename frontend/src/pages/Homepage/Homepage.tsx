import React from 'react'

function Homepage() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let isStandalone = 'This app is not standalone';
    if(('standalone' in window.navigator) && (window.navigator['standalone'])){
      isStandalone = 'This app is standalone';  
    } 

    return (
        <div className='gradient-background default-padding'>
            <p> Landing page works !</p>
            <h3> Resolution now:</h3>
            <h4> width: {screenWidth} px </h4>
            <h4> height: {screenHeight} px</h4>
            <p> {isStandalone} </p>
            <div className='white-card'>
                <h2>test area</h2>
            </div>
        </div>
    );
}

export default Homepage;