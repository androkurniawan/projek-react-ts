import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import Sidebar from './Sidebar';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/css/style.css';
import Card from 'react-bootstrap/Card';
import { NavigateFunction, useNavigate } from 'react-router-dom';

function UpdateProfileCustomer() {
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate: NavigateFunction = useNavigate();

  const [resultX, setResultX] = useState({
    username: "",
    name: "",
    email: "",
    phone: ""
  })
    
  const fetchData = () => {
    if (!localStorage.getItem('role')){
          alert("You should login first.")
          navigate("/login")
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

      fetch("http://127.0.0.1:5000/customer", requestOptions)
        .then(response => response.json())
        .then(y => {
          setResultX({
            username: y.username,
            name: y.customer_name,
            email: y.customer_email,
            phone: y.customer_phone
          })
        })
        .catch(error => console.log('error', error));
      }}

  useEffect(() => {
    fetchData();
  }, [])

const updateProfile = () => {
    let token = document.cookie
    let splitToken = token.split(".");
    let user = JSON.parse(atob(splitToken[1]));
    let usernames = user["user"];
    let passwords = user["passkey"];

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + window.btoa(usernames + ":" + passwords));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "customer_name": nameRef.current ? nameRef.current.value : "",
      "customer_email": emailRef.current ? emailRef.current.value : "",
      "customer_phone": phoneRef.current ? phoneRef.current.value : ""
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      // redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/customer", requestOptions)
      .then(response => response.json())
      .then(result => {
          alert("Update profile success.")
          navigate("/profile-customer")
      })
      .catch(error => console.log('error', error));
}
  
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    // if (e && e.currentTarget) {
    setResultX(previousResultX => ({...previousResultX, name: e.target.value}))
    // }
  }

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    // if (e && e.currentTarget) {
    setResultX(previousResultX => ({...previousResultX, email: e.target.value}))
    // }
  }

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    // if (e && e.currentTarget) {
    setResultX(previousResultX => ({...previousResultX, phone: e.target.value}))
    // }
  }

  return (
    <>
    <Sidebar />

    <section className="section profile">
      <div className="row">

        <div className="col-xl-3">
            <Card style={{width:'18rem'}}>
            </Card>
        </div>

        <div className="mt-5 mb-4 py-3 col-xl-8">

          <Card className="card">
            <div className="card-body pt-3">
              <ul className="nav nav-tabs nav-tabs-bordered">

              </ul>
              <div className="tab-content pt-2">

                <div className="tab-pane show active profile-overview" id="profile-overview">

                  <h5 className="card-title">Update Profile</h5>

                  <div className="row">
                    <div className="col-lg-3 col-md-4">Name</div>
                    <div className="col-lg-9 col-md-8">
                        <input value={resultX.name} onChange={handleName} type="text" ref={nameRef} className="form-control input-field"></input>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4">Email</div>
                    <div className="col-lg-9 col-md-8">
                        <input value={resultX.email} onChange={handleEmail} ref={emailRef} type="text" className="form-control input-field"></input>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4">Phone</div>
                    <div className="col-lg-9 col-md-8">
                        <input value={resultX.phone} onChange={handlePhone} ref={phoneRef} type="text" className="form-control input-field"></input>
                    </div>
                  </div>

                  <div className="row">
                      <div className="col-lg-3 col-md-4">
                          <button onClick={updateProfile} className="btn btn-primary">Update Profile</button>
                      </div>
                  </div>

                </div>

              </div>

            </div>
          </Card>

        </div>
      </div>
    </section>

    </>
  )
}

export default UpdateProfileCustomer;