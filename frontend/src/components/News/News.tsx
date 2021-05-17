import React from 'react';

import '../../App.scss';
import './News.scss';

//temp
import Image1 from '../../Images/aboutus.png';
import Image2 from '../../Images/futurework.png';
import { Link } from 'react-router-dom';

type NewsType = {
    image: string,
    link: string
}

const NewsList: NewsType[] = [
    {image: Image1, link: '/aboutus'},
    {image: Image2, link: '/futurework'},
    
]

const NewsCard = (img:string, link: string) => {

    const style={
        backgroundImage: "url(" + img + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      };

    return (
        <Link to={link}>
            <div className='card-news mr-3' style={style}>
       
            </div>  
        </Link>
    );
}


const News = () => {
    return (
        <div>
            <p className='small-title mb-2 color-text'>มีอะไรใหม่</p>
            <div className='news-container'>
                <div className='news-scroller'>
                   {NewsList.map(el => {
                       return NewsCard(el.image, el.link);
                   })}
                   
                    {/* <div className='card-news mr-3'>
                        test1
                    </div>
                    <div className='card-news'>
                        test2
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default News;