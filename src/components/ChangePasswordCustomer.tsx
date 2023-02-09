import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/css/style.css';
import Card from 'react-bootstrap/Card';

function ChangePasswordCustomer() {
    const [current, setCurrent] = useState('');
    const [newP, setNewP] = useState('');
    const [reenter, setReenter] = useState('');

    const handleCurrent = (e: React.FormEvent<HTMLInputElement>) => {
        setCurrent(e.currentTarget.value)
    }

    const handleNewP = (e: React.FormEvent<HTMLInputElement>) => {
        setNewP(e.currentTarget.value)
    }

    const handleReenter = (e: React.FormEvent<HTMLInputElement>) => {
        setReenter(e.currentTarget.value)
    }

    const fetchData = () => {
        let token = document.cookie
        let splitToken = token.split(".");
        let user = JSON.parse(atob(splitToken[1]));
        let usernames = user["user"];
        let passwords = user["passkey"];
  
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + window.btoa(usernames + ":" + passwords));
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            "password": newP
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
                document.cookie = "username=; expires= Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                localStorage.removeItem("role")            
                alert("Your password had been changed. Please login again to continue.");
                window.location.href = "/login"
            })
            .catch(error => console.log('error', error));
    }

    const handleOk = () => {
        if (!localStorage.getItem('role')){
            alert("You should login first.");
            window.location.href = "/login";
        } else if (!current || !newP || !reenter) {
            alert("Any field can not be empty.");
        } else if (newP !== reenter) {
            alert("Password don't match.");
        } else {
            fetchData();
        }
    }

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
                    

                    <div className="mt-5 mb-4 py-3 col-xl-8">

                    <Card className="card">
                        <div className="card-body pt-3">
                        <ul className="nav nav-tabs nav-tabs-bordered">


                        </ul>
                        <div className="tab-content pt-2">

                            <div className="tab-pane show active profile-overview" id="profile-overview">

                            <h5 className="card-title">Change Password</h5>

                            <div className="row">
                                <div className="col-lg-3 col-md-4">Current Password</div>
                                <div className="col-lg-9 col-md-8">
                                    <input onChange={handleCurrent} type="password" className="form-control input-field"></input>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-3 col-md-4">New Password</div>
                                <div className="col-lg-9 col-md-8">
                                    <input onChange={handleNewP} type="password" className="form-control input-field"></input>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-3 col-md-4">Re-enter Password</div>
                                <div className="col-lg-9 col-md-8">
                                    <input onChange={handleReenter} type="password" className="form-control input-field"></input>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-3 col-md-4">
                                    <button onClick={handleOk} className="btn btn-danger">Change Password</button>
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

export default ChangePasswordCustomer;