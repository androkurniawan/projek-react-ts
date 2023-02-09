import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

function UpdateProfileHotel() {
    const addressRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const deluxeCapacityRef = useRef<HTMLInputElement>(null);
    const deluxeFacilityRef = useRef<HTMLInputElement>(null);
    const deluxePriceRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const standardCapacityRef = useRef<HTMLInputElement>(null);
    const standardFacilityRef = useRef<HTMLInputElement>(null);
    const standardPriceRef = useRef<HTMLInputElement>(null);
    const superiorCapacityRef = useRef<HTMLInputElement>(null);
    const superiorFacilityRef = useRef<HTMLInputElement>(null);
    const superiorPriceRef = useRef<HTMLInputElement>(null);

    const navigate: NavigateFunction = useNavigate();
    // const goToTop = () => {
    //     window.scrollTo({top: 0, behavior: "smooth"})
    // }

    const [result, setResult] = useState({
        address: "",
        city: "",
        deluxeCapacity: "",
        deluxeFacility: "",
        deluxePrice: "",
        email: "",
        name: "",
        phone: "",
        standardCapacity: "",
        standardFacility: "",
        standardPrice: "",
        superiorCapacity: "",
        superiorFacility: "",
        superiorPrice: "",
        username: ""
      })

    const fetchData = () => {
        if (!localStorage.getItem('role')){
              alert("You should login first.")
              window.location.href = "/login"
          } else {
          let token = document.cookie
          let splitToken = token.split(".");
          let user = JSON.parse(atob(splitToken[1]));
          let usernames = user["user"];
          let passwords = user["passkey"];
    
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "Basic " + window.btoa(usernames + ":" + passwords));
          myHeaders.append("Content-Type", "application/json");
    
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            // redirect: 'follow'
          };
    
          fetch("http://127.0.0.1:5000/hotel", requestOptions)
            .then(response => response.json())
            .then(y => {
                    setResult({
                      address: y.address,
                      city: y.city,
                      deluxeCapacity: y.deluxe_capacity,
                      deluxeFacility: y.deluxe_facility,
                      deluxePrice: y.deluxe_price,
                      email: y.email,
                      name: y.hotel_name,
                      phone: y.phone,
                      standardCapacity: y.standard_capacity,
                      standardFacility: y.standard_facility,
                      standardPrice: y.standard_price,
                      superiorCapacity: y.superior_capacity,
                      superiorFacility: y.superior_facility,
                      superiorPrice: y.superior_price,
                      username: y.username
                    })
                })
            .catch(error => console.log('error', error));
          
          }}
    
      useEffect(() => {
        fetchData();
      }, [])

    const updateProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let token = document.cookie
        let splitToken = token.split(".");
        let user = JSON.parse(atob(splitToken[1]));
        let usernames = user["user"];
        let passwords = user["passkey"];
    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + window.btoa(usernames + ":" + passwords));
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "hotel_name": nameRef.current? nameRef.current.value : "",
            "hotel_email": emailRef.current? emailRef.current.value : "",
            "hotel_address": addressRef.current? addressRef.current.value : "",
            "city": cityRef.current? cityRef.current.value : "",
            "hotel_phone": phoneRef.current? phoneRef.current.value : "",
            "superior_capacity": superiorCapacityRef.current? superiorCapacityRef.current.value : "",
            "superior_price": superiorPriceRef.current? superiorPriceRef.current.value : "",
            "superior_facility": superiorFacilityRef.current? superiorFacilityRef.current.value : "",
            "deluxe_capacity": deluxeCapacityRef.current? deluxeCapacityRef.current.value : "",
            "deluxe_price": deluxePriceRef.current? deluxePriceRef.current.value : "",
            "deluxe_facility": deluxeFacilityRef.current? deluxeFacilityRef.current.value : "",
            "standard_capacity": standardCapacityRef.current? standardCapacityRef.current.value : "",
            "standard_price": standardPriceRef.current? standardPriceRef.current.value : "",
            "standard_facility": standardFacilityRef.current? standardFacilityRef.current.value : ""
          });
          
          var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            // redirect: 'follow'
          };
          
          fetch("http://127.0.0.1:5000/hotel", requestOptions)
            .then(response => response.text())
            .then(result => {
                    alert("Update profile success.")
                    navigate("/profile-hotel")
                    // goToTop()
                })
            .catch(error => console.log('error', error));
    }

    return (
    <>
    <Sidebar />
    
    <div className="container-fluid py-5">
        <div className="container">
            <div className="offset-lg-3 col-lg-8">

                <form id="changeForm" onSubmit={(e) => updateProfile(e)} className="row g-3">
                    <span className="border border-secondary"></span>
                    <div className="col-md-4">
                        <label className="form-label">Hotel Name</label>
                        <input id="hotel_name" onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, name: e.target.value}))}} value={result.name} ref={nameRef} type="text" className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Email</label>
                        <input ref={emailRef} id="hotel_email" onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, email: e.target.value}))}} value={result.email} type="text" className="form-control form-control-sm" />
                    </div>

                    <div className="row g-3" >
                        <span className="border border-secondary"></span>
                    </div>

                    <span className="border border-secondary"></span>
                    <div className="col-md-4">
                        <label className="form-label">Address</label>
                        <input ref={addressRef} id="hotel_address" onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, address: e.target.value}))}} value={result.address} type="text" className="form-control form-control-sm" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">City</label>
                        <input ref={cityRef} onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, city: e.target.value}))}} value={result.city} id="city"  type="text"  className="form-control form-control-sm" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Phone</label>
                        <input ref={phoneRef} onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, phone: e.target.value}))}} value={result.phone} id="hotel_phone" type="text" className="form-control form-control-sm" />
                    </div>
                    <span className="border border-secondary"></span>
                    <span className="border border-secondary"></span>

                    <div className="col-md-6">
                        <label className="form-label">Superior Capacity</label>
                        <input ref={superiorCapacityRef} onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, superiorCapacity: e.target.value}))}} value={result.superiorCapacity} min="0" name="superior_capacity" type="number" className="form-control form-control-sm" />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Superior Price</label>
                        <input ref={superiorPriceRef} onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, superiorPrice: e.target.value}))}} value={result.superiorPrice} min="0" type="number" className="form-control form-control-sm" />
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Superior Facility</label>
                        <input ref={superiorFacilityRef} onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, superiorFacility: e.target.value}))}} value={result.superiorFacility} type="text" className="form-control form-control-sm" />
                    </div>

                    <span className="border border-secondary"></span>
                    <span className="border border-secondary"></span>

                    <div className="col-md-6">
                        <label className="form-label">Deluxe Capacity</label>
                        <input ref={deluxeCapacityRef} onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, deluxeCapacity: e.target.value}))}} value={result.deluxeCapacity} min="0" type="number" className="form-control form-control-sm" />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Deluxe Price</label>
                        <input ref={deluxePriceRef} onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, deluxePrice: e.target.value}))}} value={result.deluxePrice} min="0" type="number" className="form-control form-control-sm" />
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Deluxe Facility</label>
                        <input ref={deluxeFacilityRef} onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, deluxeFacility: e.target.value}))}} value={result.deluxeFacility} type="text" className="form-control form-control-sm" />
                    </div>
    
                    <span className="border border-secondary"></span>
                    <span className="border border-secondary"></span>

                    <div className="col-md-6">
                        <label className="form-label">Standard Capacity</label>
                        <input ref={standardCapacityRef} onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, standardCapacity: e.target.value}))}} value={result.standardCapacity} min="0" type="number" className="form-control form-control-sm" />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Standard Price</label>
                        <input ref={standardPriceRef} onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, standardPrice: e.target.value}))}} value={result.standardPrice} type="number" className="form-control form-control-sm" />
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Standard Facility</label>
                        <input ref={standardFacilityRef} onChange={(e: ChangeEvent<HTMLInputElement>) => {setResult(prev => ({...prev, standardFacility: e.target.value}))}} value={result.standardFacility} type="text" className="form-control form-control-sm" />
                    </div>

                    <span className="border border-secondary"></span>

                    <div className="col-12">
                        <button type='submit' className="btn btn-warning w-100">Save</button>
                        <div style={{paddingBottom: "1em"}}></div>
                    </div>

                </form>

            </div>
        </div>
    </div>
    
    </>
  )
}

export default UpdateProfileHotel;