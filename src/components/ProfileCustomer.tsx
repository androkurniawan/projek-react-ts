import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/css/style.css';
import Card from 'react-bootstrap/Card';
import { ProfileCustomerInterface } from '../interface/Interface';

function ProfileCustomer() {
  const [result, setResult] = useState<ProfileCustomerInterface>({
    username: "",
    name: "",
    email: "",
    phone: ""
  })

  const fetchData: () => void = () => {
    if (!localStorage.getItem('role')){
          alert("You should login first.")
          window.location.href = "/login"
      } else if (localStorage.getItem('role') === 'hotel'){
        window.location.href = "/profile-hotel"
      } else {
      let token: string = document.cookie
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
          setResult({
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

  return (
    <>
    <Sidebar />

    <section className="section profile">
      <div className="row">

        <div className="col-xl-3">
            <Card style={{width:'18rem'}}>
                <Card.Img variant="top" src={require("../assets/img/profile-img.jpg")} />
            </Card>
        </div>

        <div className="mt-5 mb-5 py-4 col-xl-8">

          <Card className="card">
            <div className="card-body pt-3">
              <ul className="nav nav-tabs nav-tabs-bordered">

              </ul>
              <div className="tab-content pt-2">

                <div className="tab-pane show active profile-overview" id="profile-overview">

                  <h5 className="card-title">Profile Details</h5>

                  <div className="row">
                    <div className="col-lg-3 col-md-4">Username</div>
                    <div className="col-lg-9 col-md-8">: {result.username}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4">Name</div>
                    <div className="col-lg-9 col-md-8">: {result.name}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4">Email</div>
                    <div className="col-lg-9 col-md-8">: {result.email}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4">Phone</div>
                    <div className="col-lg-9 col-md-8">: {result.phone}</div>
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

export default ProfileCustomer;