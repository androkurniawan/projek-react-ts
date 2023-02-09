import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/css/style.css';
import { ProfileHotelInterface } from '../interface/Interface';

function ProfileHotel() {
  const [result, setResult] = useState<ProfileHotelInterface>({
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

  const fetchData: () => void = () => {
    if (!localStorage.getItem('role')){
          alert("You should login first.")
          window.location.href = "/login"
      } else if (localStorage.getItem('role') === 'customer') {
        window.location.href = "/profile-customer"
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

  const deleteHotel: () => void = () => {
    let token = document.cookie
    let splitToken = token.split(".");
    let user = JSON.parse(atob(splitToken[1]));
    let usernames = user["user"];
    let passwords = user["passkey"];

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + window.btoa(usernames + ":" + passwords));
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      // redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:5000/hotel", requestOptions)
      .then(response => response.text())
      .then(result => {
        alert('Your hotel successfully deleted.')
        document.cookie = "username=; expires= Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        localStorage.removeItem("role")
        window.location.href = "/"
      })
      .catch(error => console.log('error', error));
  }

  const confirmDelete = () => {
    if (window.confirm("Are you sure to delete your Hotel?")) {
      deleteHotel();
    } else {
        alert("Cancel delete Hotel.")
    }
}

  return (
    <>
    <Sidebar />

    <div className="container-fluid py-5">
            <div className="container">
                <div className="offset-lg-3 col-lg-8">

                    <div className="row g-3">
                        <span className="border border-secondary"></span>
                        <div className="col-md-4">
                        <label className="form-label">Hotel Name</label>
                        <div id="hotelName" style={{backgroundColor: "yellow"}}>{result.name}</div>
                        </div>

                        <div className="col-md-4">
                        <label className="form-label">Username</label>
                        <div id="username" style={{backgroundColor: "yellow"}}>{result.username}</div>
                        </div>

                        <div className="col-md-4">
                        <label className="form-label">Email</label>
                        <div id="email" style={{backgroundColor: "yellow"}}>{result.email}</div>
                        </div>

                        <div className="row g-3" >
                        <span className="border border-secondary"></span>

                        <span className="border border-secondary"></span>
                        <div className="col-md-4">
                        <label className="form-label">Address</label>
                        <div id="address" style={{backgroundColor: "yellow"}}>{result.address}</div>
                        </div>

                        <div className="col-md-4">
                        <label className="form-label">City</label>
                        <div id="city" style={{backgroundColor: "yellow"}}>{result.city}</div>
                        </div>

                        <div className="col-md-4">
                        <label className="form-label">Phone</label>
                        <div id="phone" style={{backgroundColor: "yellow"}}>{result.phone}</div>
                        </div>
                        <span className="border border-secondary"></span>
                        <span className="border border-secondary"></span>

                        <div className="col-md-6">
                        <label className="form-label">Superior Capacity</label>
                        <div id="supCap" style={{backgroundColor: "yellow"}}>{result.superiorCapacity}</div>
                        </div>

                        <div className="col-md-6">
                        <label className="form-label">Superior Price</label>
                        <div id="supPrice" style={{backgroundColor: "yellow"}}>{result.superiorPrice}</div>
                        </div>

                        <div className="col-md-12">
                        <label className="form-label">Superior Facility</label>
                        <div id="supFac" style={{backgroundColor: "yellow"}}>{result.superiorFacility}</div>
                        </div>

                        <span className="border border-secondary"></span>
                        <span className="border border-secondary"></span>

                        <div className="col-md-6">
                        <label className="form-label">Deluxe Capacity</label>
                        <div id="delCap" style={{backgroundColor: "yellow"}}>{result.deluxeCapacity}</div>
                        </div>

                        <div className="col-md-6">
                        <label className="form-label">Deluxe Price</label>
                        <div id="delPrice" style={{backgroundColor: "yellow"}}>{result.deluxePrice}</div>
                        </div>

                        <div className="col-md-12">
                        <label className="form-label">Deluxe Facility</label>
                        <div id="delFac" style={{backgroundColor: "yellow"}}>{result.deluxeFacility}</div>
                        </div>
        
                        <span className="border border-secondary"></span>
                        <span className="border border-secondary"></span>

                        <div className="col-md-6">
                        <label className="form-label">Standard Capacity</label>
                        <div id="standCap" style={{backgroundColor: "yellow"}}>{result.standardCapacity}</div>
                        </div>

                        <div className="col-md-6">
                        <label className="form-label">Standard Price</label>
                        <div id="standPrice" style={{backgroundColor: "yellow"}}>{result.standardPrice}</div>
                        </div>

                        <div className="col-md-12">
                        <label className="form-label">Standard Facility</label>
                        <div id="standFac" style={{backgroundColor: "yellow"}}>{result.standardFacility}</div>
                        </div>

                        <span className="border border-secondary mb-3"></span>

                        <div className="container row">
                            <div onClick={confirmDelete} className="col-2 btn btn-danger">DELETE HOTEL</div>
                        </div>           
                        </div>

                    </div>

                </div>
            </div>
        </div>

    </>
  )
}

export default ProfileHotel;