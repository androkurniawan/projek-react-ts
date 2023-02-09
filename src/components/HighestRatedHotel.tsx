import React, { useEffect, useState } from 'react';
import { Rating } from '../interface/Interface';

function HighestRatedHotel() {
    const [high, setHight] = useState<Rating[]>([]);

    const fetchData = () => {
        return fetch("http://127.0.0.1:5000/toprating")
            .then((response) => response.json())
            .then(x => {
                setHight(x)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    const hotels = high.map((y: Rating, index: number) => {
        return (
            <div key={index + 1} className="container bg-light card offset-md-1 mb-4">
                <div className="row align-items-md-stretch">
                    <div className="col-md-3">
                    <div className="h-100 p-3 bg-light rounded-3">
                        <img src={require(`../assets/img/rating${index+1}.jpg`)} alt="" width="100%" />
                    </div>
                    </div>
                    <div className="col-md-7 align-self-center">
                    <div>
                        <h2 id="rating1Hotel">{y.hotel_name}</h2>
                        <h3 id="rating1City">{y.city}</h3>
                        <h4 id="rating1Rating">Average rating: {y.average_rating}</h4>
                    </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
    <>
        <section id="horizontalLine">
            <div className="divider mb-0"><span></span><span>Highest Rated Hotels</span><span></span></div>
            <div className="container text-center mb-5"><p>The hotel with the highest rating is always be a consideration.</p></div>

                {hotels}

        </section>
    </>
  )
}

export default HighestRatedHotel;