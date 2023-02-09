import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Bookings } from '../interface/Interface';

function MyBooking() {
    const [rating, setRating] = useState("Give your rating");
    const [booking, setBooking] = useState<Bookings[]>([]);
    const token: string = document.cookie;

    const fetchData: () => void = () => {
        let token = document.cookie;
        let splitToken = token.split(".");
        let user = JSON.parse(atob(splitToken[1]));
        let username = user["user"];
        let password = user["passkey"];

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + btoa(username + ":" + password));

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        // redirect: 'follow'
        };

        fetch("http://127.0.0.1:5000/mybooking", requestOptions)
        .then(response => response.json())
        .then(x => {
            setBooking(x)
        })
        .catch(error => console.log(error))
    }

    const giveRating = (id: number) => {
        let token = document.cookie;
        let splitToken = token.split(".");
        let user = JSON.parse(atob(splitToken[1]));
        let username = user["user"];
        let password = user["passkey"];

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + btoa(username + ":" + password));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "rating": rating
          });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        // redirect: 'follow'
        };

        fetch("http://127.0.0.1:5000/rating/" + id, requestOptions)
        .then(response => response.json())
        .then(x => {
            alert(x.message)
            window.location.reload()
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        if (token){
        fetchData()
        }
        else {alert("Login first.")
                window.location.href = "/login"};
    }, [token])

    const result = booking.map((y: Bookings) => {
        return (
            <div key={y.booking_id} className="container mb-5 mt-3 bg-warning card px-3" id="icon-grid">

            <div className="bg-light me-5">
                    <h2 className="pb-2 border-bottom ms-5 mt-3" id="hotel">{y.hotel}</h2>
                <div className="row g-4 py-0">
                
                <div className="col ms-5 d-flex align-items-start">
                    <i className="fa-solid fa-location-dot fa-xl bi flex-shrink-0 me-3 pt-4"></i>
                    <div>
                        <h3 className="fw-bold mb-0 fs-4" id="city">City: {y.city}</h3>
                        <p className='py-2' id="address">Address: {y.address}</p>
                    </div>
                </div>

                <div className="col d-flex align-items-start">
                    <i className="fa-regular fa-calendar-days fa-xl bi flex-shrink-0 me-3 pt-4"></i>
                    <div>
                        <h3 className="fw-bold mb-0 fs-4">Date</h3>
                        <p className='pt-2'>Checkin: {y.checkin.slice(0,-13)} <span id="checkin"></span></p>
                        <p>Checkout: {y.checkout.slice(0,-13)} <span id="checkout"></span></p>
                    </div>
                </div>

                <div className="col d-flex align-items-start">
                    <i className="fa-solid fa-house-user fa-xl bi flex-shrink-0 me-3 pt-4"></i>
                    <div>
                        <h3 className="fw-bold mb-0 fs-4">Room</h3>
                        <p className='pt-2'>Superior: {y.amount_of_superior_room}<span id="superior"></span></p>
                        <p>Deluxe: {y.amount_of_deluxe_room}<span id="deluxe"></span></p>
                        <p>Standard: {y.amount_of_standard_room}<span id="standard"></span></p>
                        <p>Total Price: Rp {y.total_price}<span id="totalPrice"></span></p>
                    </div>
                </div>

                <div className="col d-flex align-items-start">
                    <i className="fa-solid fa-sliders fa-xl bi flex-shrink-0 me-3 pt-4"></i>
                    <div>
                        <h3 className="fw-bold mb-0 fs-4">Featured</h3>
                        <p className='pt-2'>Booking ID: {y.booking_id}<span id="bookingId"></span></p>
                        <p>Phone number: {y.phone}<span id="phone"></span></p>
                    </div>
                </div>

                <div className="col d-flex align-items-start">
                    <i className="fa-regular fa-star fa-xl bi flex-shrink-0 me-3 pt-4"></i>
                    <div>
                        <h3 className="fw-bold mb-0 fs-4">Rating: <span id="rating"></span></h3>
                        <p className='pt-2'>{y.rating}</p>

                        <Form.Select onChange={(e) => e.preventDefault()} size="sm" style={{display: (y.rating) ? "none" : "block"}} aria-label="Default select example">
                            <option>Select rating</option>
                            <option onClick={() => setRating("5")}>5</option>
                            <option onClick={() => setRating("4")}>4</option>
                            <option onClick={() => setRating("3")}>3</option>
                            <option onClick={() => setRating("2")}>2</option>
                            <option onClick={() => setRating("1")}>1</option>
                        </Form.Select>

                        <Button
                            onClick={() => {
                                giveRating(y.booking_id);
                            }}
                            style={{display: (y.rating) ? "none" : "block"}}
                            className="mt-3" size="sm" variant="primary">
                        Give rating</Button>

                    </div>
                    
                </div>

            </div>
            </div>
        </div>

        )
    })

    return (
        <section id="horizontalLine" className="mb-0">

            <div className="divider"><span></span><span>Booking History</span><span></span></div>
        
            {result}

        </section>
  )
}

export default MyBooking;