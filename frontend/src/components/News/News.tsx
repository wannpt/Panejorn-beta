import React from 'react';

import '../../App.scss';
import './News.scss';

//temp
import Image1 from '../../Images/cover_kbank-850x567.jpg';
import Image2 from '../../Images/s_179897_9953.jpg';

type NewsType = {
    image: string,
    id: number
}

const NewsList: NewsType[] = [
    {image: Image1, id: 0},
    {image: Image2, id: 1}
]

const NewsCard = (img:string) => {

    const style={
        backgroundImage: "url(" + img + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      };

    return (
    <div className='card-news mr-3' style={style}>
    </div>
    );
}

const News = () => {
    return (
        <div>
            <p className='small-title mb-2 color-text'>มีอะไรใหม่</p>
            <div className='news-container'>
                <div className='news-scroller'>
                   {NewsList.map(el => {
                       return NewsCard(el.image);
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