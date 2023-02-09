import React, {useState} from 'react';

function RegisterHotel() {
    const [allValues, setAllValues] = useState({
        hotelName: '',
        username: '',
        email: '',
        password: '',
        confirm: '',
        address: '',
        city: '',
        phone: '',
        superiorCapacity: '',
        superiorPrice: '',
        superiorFacility: '',
        deluxeCapacity: '',
        deluxePrice: '',
        deluxeFacility: '',
        standardCapacity: '',
        standardPrice: '',
        standardFacility: '',        
    })

    const changeHandler = (e: any) => {
        setAllValues(prevValues => {
            return {...prevValues, [e.target.name]: e.target.value}}
        )
    }

    const handleRegister = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "hotel_name": allValues.hotelName,
            "username": allValues.username,
            "password": allValues.password,
            "superior_capacity": allValues.superiorCapacity,
            "deluxe_capacity": allValues.deluxeCapacity,
            "standard_capacity": allValues.standardCapacity,
            "superior_facility": allValues.superiorFacility,
            "deluxe_facility": allValues.deluxeFacility,
            "standard_facility": allValues.standardFacility,
            "superior_price": allValues.superiorPrice,
            "deluxe_price": allValues.deluxePrice,
            "standard_price": allValues.standardPrice,
            "city": allValues.city,
            "hotel_address": allValues.address,
            "hotel_phone": allValues.phone,
            "email": allValues.email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            // redirect: 'follow'
        };

        fetch("http://127.0.0.1:5000/hotel", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message === "SUCCESSFULLY register a new Hotel.") {
                    alert("SUCCESSFULLY register a new Hotel. Please login to continue.")
                    window.location.href = "/login"
                } else {
                    alert("FAILED to register a new Hotel. May be username or hotel name or hotel phone number had been taken by another hotel.")
                }
            })
            .catch(error => {
                alert("Gagal FETCHING.")
                console.log('error', error)});
    }

    return (
        <>
        <section>
            <div id="background-image">
            <div className="container" style={{paddingTop: "1.5em"}}><p></p></div>
            <div className="container text-center">
                <h1><b>One step more... Complete your data!</b></h1>
            </div>

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="offset-lg-2 col-lg-8">

                        <div className="row g-3">
                            <span className="border border-warning"></span>
                            <div className="col-md-4">
                            <label className="form-label"><b>Hotel Name</b></label>
                            <input name="hotelName" onChange={changeHandler} id="hotelName" type="text" className="form-control form-control-sm" placeholder="Enter your hotel name" autoComplete="off" />
                            </div>

                            <div className="col-md-4">
                            <label className="form-label"><b>Username</b></label>
                            <input name="username" onChange={changeHandler} id="hotelUsername" type="text" className="form-control form-control-sm" placeholder="Create username for your hotel" autoComplete="off" />
                            </div>

                            <div className="col-md-4">
                            <label className="form-label"><b>Email</b></label>
                            <input name="email" onChange={changeHandler} id="hotelEmail" type="email" className="form-control form-control-sm" placeholder="Enter your email" autoComplete="off" />
                            </div>

                            <div className="col-md-6">
                            <label className="form-label"><b>Password</b></label>
                            <input name="password" onChange={changeHandler} id="hotelPassword" type="password" className="form-control form-control-sm" placeholder="Enter your password" autoComplete="off" />
                            <label className="form-text">Make the unpredictable password</label>
                            </div>

                            <div className="col-md-6">
                            <label className="form-label"><b>Confirm Password</b></label>
                            <input name="confirm" onChange={changeHandler} id="hotelPasswordConfirm" type="password" className="form-control form-control-sm" placeholder="Enter your password again" autoComplete="off" />
                            </div>

                            <div className="col-md-4">
                            <label className="form-label"><b>Address</b></label>
                            <input name="address" onChange={changeHandler} id="hotelAddress" type="text" className="form-control form-control-sm" placeholder="The address of your hotel" autoComplete="off" />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label"><b>City</b></label>
                                <input name="city" onChange={changeHandler} id="hotelCity" type="text" className="form-control form-control-sm" placeholder="The city of your hotel location" autoComplete="off" />
                                </div>

                            <div className="col-4">
                            <label className="form-label"><b>Phone Number</b></label>
                            <input name="phone" onChange={changeHandler} id="hotelPhone" type="text" className="form-control form-control-sm" placeholder="Your hotel phone number" autoComplete="off" />
                            </div>
                        
                        <div className="row g-3" >
                            <span className="border border-warning"></span>

                            <div className="col-6">
                            <label className="form-label"><b>Superior Capacity</b></label>
                            <input name="superiorCapacity" onChange={changeHandler} id="superiorCapacity" type="number" min="0" className="form-control form-control-sm" />
                            <label className="form-text">Choose the capacity of Superior room</label>
                            </div>

                            <div className="col-6">
                            <label className="form-label"><b>Superior Price</b></label>
                            <input name="superiorPrice" onChange={changeHandler} id="superiorPrice" type="number" min="0" className="form-control form-control-sm" />
                            <label className="form-text">Set price for Superior room</label>
                            </div>

                            <div className="col-12">
                            <label className="form-label"><b>Superior Room Facility</b></label>
                            <textarea name="superiorFacility" onChange={changeHandler} id="superiorFacility" className="form-control form-control-sm"></textarea>
                            </div>
                            
                        </div>

                        <div className="row g-3" >
                            <span className="border border-warning"></span>

                            <div className="col-6">
                            <label className="form-label"><b>Deluxe Capacity</b></label>
                            <input name="deluxeCapacity" onChange={changeHandler} min="0" id="deluxeCapacity" type="number" className="form-control form-control-sm" />
                            <label className="form-text">Choose the capacity of Deluxe room</label>
                            </div>

                            <div className="col-6">
                            <label className="form-label"><b>Deluxe Price</b></label>
                            <input name="deluxePrice" onChange={changeHandler} min="0" id="deluxePrice" type="number" className="form-control form-control-sm" />
                            <label className="form-text">Set price for Deluxe room</label>
                            </div>

                            <div className="col-12">
                            <label className="form-label"><b>Deluxe Room Facility</b></label>
                            <textarea name="deluxeFacility" onChange={changeHandler} id="deluxeFacility" className="form-control form-control-sm"></textarea>
                            </div>
                            
                        </div>

                        <div className="row g-3" >
                            <span className="border border-warning"></span>

                            <div className="col-6">
                            <label className="form-label"><b>Standard Capacity</b></label>
                            <input name="standardCapacity" onChange={changeHandler} min={0} id="standardCapacity" type="number" className="form-control form-control-sm" />
                            <label className="form-text">Choose the capacity of Standard room</label>
                            </div>

                            <div className="col-6">
                            <label className="form-label"><b>Standard Price</b></label>
                            <input name="standardPrice" onChange={changeHandler} min={0} id="standardPrice" type="number" className="form-control form-control-sm" />
                            <label className="form-text">Set price for Standard room</label>
                            </div>

                            <div className="col-12">
                            <label className="form-label"><b>Standard Room Facility</b></label>
                            <textarea name="standardFacility" onChange={changeHandler} id="standardFacility" className="form-control form-control-sm"></textarea>
                            </div>
                            
                        </div>

                            <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                                <label className="form-check-label">
                                I agree with <a href="google.com">term and condition</a>.
                                </label>
                            </div>
                            </div>

                            <div className="col-12">
                            <button onClick={handleRegister} type="submit" className="btn btn-warning w-100"><b>Register My Hotel</b></button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    </section>
    </>
    )
}

export default RegisterHotel;