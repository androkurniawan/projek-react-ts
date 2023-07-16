import React, {useState, useEffect} from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { HotelData } from '../interface/Interface';

function Booking() {
    const [data, setData] = useState<HotelData>({
        hotelName: '',
        city: '',
        address: '',
        superiorPrice: 0,
        deluxePrice: 0,
        standardPrice: 0,
        superiorStock: 0,
        deluxeStock: 0,
        standardStock: 0,
        superiorFacility: '',
        deluxeFacility: '',
        standardFacility: ''
    })

    const [superiorAmount, setSuperiorAmount] = useState(0);
    const [deluxeAmount, setDeluxeAmount] = useState(0);
    const [standardAmount, setStandardAmount] = useState(0);

    const city: string = localStorage.getItem('city') || '';
    const checkin: string = localStorage.getItem('checkin') || '';
    const checkout: string = localStorage.getItem('checkout') || '';
    const hotelId: string = localStorage.getItem('idSearching') || '';
    const navigate: NavigateFunction = useNavigate();

    const totalPrice: number = (superiorAmount*+data.superiorPrice) + (deluxeAmount*+data.deluxePrice) + (standardAmount*+data.standardPrice)
    const formattedNumber = (z: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(z);
    };

    const fetchingData: () => void = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "idHotel": hotelId,
        "checkin": checkin,
        "checkout": checkout,
        "city": city
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        // redirect: 'follow'
        };

        fetch("http://127.0.0.1:5000/hotelbooking", requestOptions)
        .then(response => response.json())
        .then(y => {
            setData({
                hotelName: y[0]._hotel_name,
                city: y[0].city,
                address: y[0].address,
                superiorPrice: y[0].superior_price,
                deluxePrice: y[0].deluxe_price,
                standardPrice: y[0].standard_price,
                superiorStock: y[0].superior_stock,
                deluxeStock: y[0].deluxe_stock,
                standardStock: y[0].standard_stock,
                superiorFacility: y[0].superior_facility,
                deluxeFacility: y[0].deluxe_facility,
                standardFacility: y[0].standard_facility
            })
        })
        .catch(error => {
            alert('Back to Home page and complete all form to see/search available hotels.')
            navigate("/")
        })
    }

    useEffect(() => {
        fetchingData();
    }, [])

    const reservation = () => {
        if (localStorage.getItem('role') !== 'customer'){
            if (window.confirm("You should login as Customer to booking a hotel. Do you want login as customer now")) {
                document.cookie = "username=; expires= Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                localStorage.removeItem("role")
                navigate("/login-booking")
              } else {
              }
        } else {
        let token = document.cookie
        let splitToken = token.split(".");
        let user = JSON.parse(atob(splitToken[1]));
        let usernames = user["user"];
        let passwords = user["passkey"];

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + window.btoa(usernames + ":" + passwords));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "check_in_date": checkin,
        "check_out_date": checkout,
        "amount_of_superior_room": superiorAmount,
        "amount_of_deluxe_room": deluxeAmount,
        "amount_of_standard_room": standardAmount,
        "hotel_id": hotelId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            // redirect: 'follow',
        };

        if (superiorAmount !== 0 || deluxeAmount !== 0 || standardAmount !== 0) {
            fetch("http://127.0.0.1:5000/booking", requestOptions)
                .then(response => response.text())
                .then(result => {
                    alert("Success booking a hotel.")
                    navigate("/mybooking")
                })
                .catch(error => {
                    alert("Fetching Failed.")
                    console.log('error', error)
                })
        } else (alert("You can not booking with zero room."))
        }
    }

    return (
        <section id="horizontalLine" className="mb-0">
            <div className="divider">
                <span></span><span>Booking</span><span></span>
            </div>

            <main>
                <div className="container offset-md-1 mb-1 py-2">
                    <div className="row g-5">
                        <div className="col-md-6">
                            <div className="card shadow-sm">
                            <img src={require("../assets/img/caribooking.png")} width="100%" height="300" className="d-block w-100" alt="" />
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="h-100 p-5 border bg-light">
                                <h1 id="hotelName">{data.hotelName}</h1>
                                <h2 id="hotelCity">{data.city}</h2>
                                <h3 id="hotelAddress">Addres: {data.address}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <section>
                <div className="container py-2">
                    <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                        <h2 className="fw-normal"><span style={{color:"red"}}>Room</span> and <span style={{color:"red"}}>Facility</span></h2>
                    </div>
                
                <main>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5">
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header text-bg-danger py-3">
                                    <h4 className="my-0 fw-normal text-center">Superior Room</h4>
                                </div>
                            <div className="card-body">
                                <h1 className="card-title text-center pricing-card-title mb-3" id="superiorPrice">{formattedNumber(data.superiorPrice).slice(3, -3)},-<small className="text-muted fw-light" id="perNight1">/night</small></h1>
                                <div className="text-center">
                                    <p>Facility:</p>
                                    <p id="superiorFacility">{data.superiorFacility}</p>
                                </div>
                                <div className="btn-group btn-group-md">
                                    <button
                                        style={{maxWidth: "15%"}}
                                        onClick={() => 
                                            {if (superiorAmount > 0) {
                                                setSuperiorAmount(superiorAmount - 1)
                                            }}
                                        }
                                        className="btn btn-primary">
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                    <input
                                        value={superiorAmount}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                            if (+e.currentTarget.value >= 0 && +e.currentTarget.value <= data.superiorStock){
                                                setSuperiorAmount(Number(e.currentTarget.value))
                                            }
                                        }}
                                        style={{maxWidth: "15%", textAlign: "center"}}
                                    />
                                    <button
                                        style={{maxWidth: "15%"}}
                                        onClick={() =>
                                            {if (superiorAmount < data.superiorStock) {
                                                setSuperiorAmount(superiorAmount + 1)
                                                console.log(data.superiorStock)
                                            }}
                                        }
                                        className="btn btn-primary">
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div><br></br>
                                <small className="text-muted text-start">Amount of room can't exceed stock. Stock: {data.superiorStock}</small> 
                            </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header text-bg-danger py-3">
                                    <h4 className="my-0 fw-normal text-center">Deluxe Room</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title mb-3 text-center" id="deluxePrice">Rp {formattedNumber(data.deluxePrice).slice(3, -3)},-<small className="text-muted fw-light">/night</small></h1>
                                    <div className="text-center">
                                    <p>Facility:</p>
                                    <p id="deluxeFacility">{data.deluxeFacility}</p>
                                </div>
                                <div className="btn-group btn-group-md">
                                    <button
                                        style={{maxWidth: "15%"}}
                                        onClick={ () => 
                                            {if (deluxeAmount > 0) {
                                                setDeluxeAmount(deluxeAmount - 1)
                                            }}
                                        }
                                        className="btn btn-primary">
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                    <input
                                        value={deluxeAmount}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                            if (+e.currentTarget.value >= 0 && +e.currentTarget.value <= data.deluxeStock){
                                                setDeluxeAmount(Number(e.currentTarget.value))
                                            }
                                        }}
                                        style={{maxWidth: "15%", textAlign: "center"}}
                                    />
                                    <button
                                        style={{maxWidth: "15%"}}
                                        onClick={() => 
                                            {if (deluxeAmount < data.deluxeStock)
                                                {setDeluxeAmount(deluxeAmount + 1)
                                            }}
                                        }
                                        className="btn btn-primary">
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div><br></br>
                                <small className="text-muted text-start">Amount of room can't exceed stock. Stock: {data.deluxeStock}</small> 
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header text-bg-danger py-3">
                                    <h4 className="my-0 fw-normal text-center">Standard Room</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title text-center pricing-card-title mb-3" id="standardPrice">Rp {formattedNumber(data.standardPrice).slice(3, -3)},-<small className="text-muted fw-light">/night</small></h1>
                                <div className="text-center">
                                    <p>Facility:</p>
                                    <p id="standardFacility">{data.standardFacility}</p>
                                </div>
                                <div className="btn-group btn-group-md">
                                    <button
                                        style={{maxWidth: "15%"}}
                                        onClick={ () => 
                                            {if (standardAmount > 0) {
                                                setStandardAmount(standardAmount - 1)
                                            }}
                                        }
                                        className="btn btn-primary">
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                    <input
                                        value={standardAmount}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                            if (+e.currentTarget.value >= 0 && +e.currentTarget.value <= data.standardStock){
                                                setStandardAmount(Number(e.currentTarget.value))
                                            }
                                        }}
                                        style={{maxWidth: "15%", textAlign: "center"}}
                                    />
                                    <button
                                        style={{maxWidth: "15%"}}
                                        onClick={() => 
                                            {if (standardAmount < data.standardStock)
                                                {setStandardAmount(standardAmount + 1)
                                            }}
                                        }
                                        className="btn btn-primary">
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div><br></br>
                                <small className="text-muted text-start">Amount of room can't exceed stock. Stock: {data.standardStock}</small> 
                                </div>
                            </div>
                        </div>



                    </div>
                </main>
            </div>

            <div className="d-flex flex-row mb-3 container">
        <div className="p-2">
            <h3>Total price: Rp {formattedNumber(totalPrice).slice(3, -3)},-</h3>
            
        </div>
    </div>
      
    <div className="container">
        <div className="col mb-5">
        <button onClick={reservation} type="button" className="col-md-12 btn btn-warning">Book Now</button>
        </div>
    </div>

            </section>         

    </section>
    )
}

export default Booking;