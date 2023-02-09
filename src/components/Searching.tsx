import React, {useState, useEffect} from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

function Searching() {
    const [hotel, setHotel] = useState([]);
    const city = localStorage.getItem('city');
    const checkin = localStorage.getItem('checkin');
    const checkout = localStorage.getItem('checkout');
    const navigate: NavigateFunction = useNavigate()

    const fetchingData = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "city": city,
        "checkin": checkin,
        "checkout": checkout
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        // redirect: 'follow'
        };

        fetch("http://127.0.0.1:5000/searching", requestOptions)
        .then(response => response.json())
        .then(x => {
            setHotel(x)
        })
    }

    useEffect(() => {
        fetchingData();
    }, [])

    const result = hotel.map((y: any, index: number) => {
        return (
            <div key={y._hotel_id} className="card container mb-5 bg-light offset-lg-2 col-lg-8">

                        <div className="row d-flex">
                            <div className="col-md-4 align-self-center">
                                <div className="align-self-center">
                                    <img src={require(`../assets/img/cari${index+1}.png`)} className="d-block w-100" alt="search-1" />
                                </div>
                            </div>

                            <div className="col-md-4 py-3">
                                <h4 id="hotelName">{y._hotel_name}</h4>
                                <h4 id="hotelCity">{y.city}</h4>
                                <h4 id="hotelAddress">{y.address}</h4>
                            </div>
                
                            <div className="col-md-4 py-3">
                                <h4 id="supPrice">Superior price: Rp {y.superior_price}</h4>
                                <h4 id="delPrice">Deluxe price: Rp {y.deluxe_price}</h4>
                                <h4 id="standPrice">Standard price: Rp {y.standard_price}</h4>
                                <button
                                    style={{backgroundColor:"#003566", color:"white"}}
                                    type="button" className="btn"
                                    onClick={() => {
                                        localStorage.setItem('idSearching', y._hotel_id)
                                        navigate("/booking")
                                        window.scrollTo({top: 0, behavior : "smooth"})
                                    }}>
                                        Booking Now
                                </button>
                            </div>

                        </div>                 

                    </div>
        )
    })

    return (
        <section id="horizontalLine" className="mb-0">
            <div className="divider"><span></span><span>Searching Hotels</span><span></span></div>

                <div className="text-center card mb-5" style={{backgroundColor: "white"}}>
                    <div className="card-header">
                        <h4>Hotel with term {city} with Checkin date {checkin} <span id="checkin"></span><span>and Checkout date {checkout}</span> <span id="checkout"></span></h4>
                    </div>
                </div>

                <div id="menu-parent">
                    {result}
                </div>
        </section>

  )
}

export default Searching;
