import React from 'react'


function Homepage() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    return (
        <div>
            <p> Landing page works !</p>
            <h3> Resolution now:</h3>
            <h4> width: {screenWidth} px </h4>
            <h4> height: {screenHeight} px</h4>
        </div>
    );
}

export default Homepage;