import React, {useEffect, useState} from 'react';

function TopUsers() {
    const [top, setTop] = useState([]);

    const fetchData = () => {
        return fetch("http://127.0.0.1:5000/topuser")
            .then((response) => response.json())
            .then(x => {
                setTop(x)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const words = (index: number) => {
        if (index === 0) {
            return (
                <p className="px-xl-3"><i className="fas fa-quote-left pe-2"></i>
                    Words can't explain the kind of treatment I received from the management of Oracle. They are the best in the country.
                </p>
            )
        } else if (index === 1) {
            return (
                <p className="px-xl-3"><i className="fas fa-quote-left pe-2"></i>
                    Oracle makes you feel the best room quality that makes you feel the comfort of a home.
                </p>
            )
        } else
            return (
                <p className="px-xl-3"><i className="fas fa-quote-left pe-2"></i>
                    My Family and I are very happy when using Oracle. They are by far the best in the universe.
                </p>
            )
    }

    const people = top.map((y: any, index: number) => {
        return (
            <div className="col-md-4 mb-5 mb-md-0" key={y.id}>
                <div className="d-flex justify-content-center mb-4">
                    <img src={require(`../assets/img/top${index+1}.jpg`)} alt="" className="rounded-circle shadow-1-strong" width="150" height="150" />
                </div>
                <h5 id="top1Name" className="mb-3">{y.customer_name}</h5>
                <h6 id="top1TotalBooking" className="text-primary mb-3">Total booking: {y.number_of_booking}</h6>
                {words(index)}
            </div>
        )
    })

    return (
        <section id="topUser" className="mb-3">
            <section id="horizontalLine">
                <div className="divider"><span></span><span>Top Users</span><span></span></div>
            </section>

            <div className="container">
                <div className="row d-flex justify-content-center">
                <div className="col-md-10 col-xl-8 text-center">
                </div>
                </div>
                <div className="row text-center">

                    {people}

                </div>
                </div>
        </section>
  )
}

export default TopUsers
