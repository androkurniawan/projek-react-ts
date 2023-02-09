import React, {useEffect, useState} from 'react';
import { TopHotel } from '../interface/Interface';

function MostVisitedHotels() {
    const [visit, setVisit] = useState<TopHotel[]>([]);

    const fetchData: () => void = async () => {
        const response = await fetch("http://127.0.0.1:5000/tophotel");
        const x = await response.json();
        setVisit(x);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const hotels = visit.map((y: TopHotel, index: number) => {
        return (
            <div className="col" key={y.id}>
                <div className="card shadow-sm">
                    <img src={require(`../assets/img/mostVisit${index+1}.jpg`)} width="100%" height="300" className="d-block w-100" alt=""></img>
                    <div className="card-body">
                        <h3 className="mt-2">City: {y.hotel_city}</h3>
                        <h4>{y.hotel_name}</h4>
                        <p>Total booking: {y.total_booking}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group"></div>
                    </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <section id="mostVisitHotel">
            <div className="album py-5 bg-light">
                <div className="container mb-4 text-center" id="titleMostVisitHotel">
                    <h2>Most Visited Hotels</h2>
                    <p>The hotel with the highest number of bookings. Could be one of your choices.</p>
                </div>

                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {hotels}
                    </div>
                </div>

            </div>
        </section>
  )
}

export default MostVisitedHotels;