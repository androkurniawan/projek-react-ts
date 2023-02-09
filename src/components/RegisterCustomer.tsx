import React, {useState} from 'react';
import {MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon} from 'mdb-react-ui-kit';

function RegisterCustomer() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }
  
  const handleChangeUsername = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  }

  const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const handleChangePhone = (e: React.FormEvent<HTMLInputElement>) => {
    setPhone(e.currentTarget.value);
  }

  const handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  const handleChangeConfirmPassword = (e: React.FormEvent<HTMLInputElement>) => {
    setConfirm(e.currentTarget.value)
  }

  const handleSignUp = () => {
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            customer_name: name,
            username: username,
            password: password,
            customer_email: email,
            customer_phone: phone,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            // redirect: "follow",
        };

        if (
            name === "" ||
            username === "" ||
            password === "" ||
            confirm === "" ||
            email === "" ||
            phone === ""
        ) {
            return alert("A field can not be empty.");
        } 
        
        else {
            fetch("http://127.0.0.1:5000/customer", requestOptions)
            .then((response) => response.text())
            .then((data) => {
                if (data !== "False"){
                    alert("Success create an account. Please login to continue.")
                    window.location.href = "/login"
                } else {
                    alert("Failed create a new account because the username was taken. Try again with another username.")
                }                
            })
            .catch(error => {
                alert("GAGAL FETCHING.")
                console.log('error', error)
              }
            );
        }
  }

  return (
    <MDBContainer className='p-4'>

      <MDBRow>

        <MDBCol md='7' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 style={{color: "#ffc300"}} className="my-5 display-5 fw-bold ls-tight px-3">
            Let's register your account, <br />
            <span className="display-5 text-secondary">you will have an extraordinary experience.</span>
          </h1>

        </MDBCol>

        <MDBCol md='4'>

          <MDBCard className='my-4'>
            <MDBCardBody className='p-4'>

              <MDBRow>
                <MDBCol col='6'>
                <label>Name</label>
                  <MDBInput onChange={handleChangeName} wrapperClass='mb-4' type='text'/>
                </MDBCol>

                <MDBCol col='6'>
                <label>Username</label>
                  <MDBInput onChange={handleChangeUsername} wrapperClass='mb-4' type='text'/>
                </MDBCol>
              </MDBRow>

              <label>Email</label>
              <MDBInput onChange={handleChangeEmail} wrapperClass='mb-2' type='email'/>

              <label>Phone</label>
              <MDBInput onChange={handleChangePhone} wrapperClass='mb-2' type='text'/>

              <label>Password</label>
              <MDBInput onChange={handleChangePassword} wrapperClass='mb-2' type='password'/>

              <label>Confirm Password</label>
              <MDBInput onChange={handleChangeConfirmPassword} wrapperClass='mb-4' type='password'/>

              <MDBBtn onClick={handleSignUp} className='w-100 mb-2' size='md'>Sign Up</MDBBtn>

              <div className="text-center">

                <p>or sign up with:</p>

                <MDBBtn tag='a' href='http://www.facebook.com' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' href='http://www.twitter.com' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' href='https://accounts.google.com/v3/signin/identifier?dsh=S-2096941787%3A1671854281143008&hl=id&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AeAAQh6phgv47elB6puOnrIIoRwtwzJsT4q5p-0gc0g_6ZHQ2CM3dxNCBocL4ZfShTZaj1Uu66Mz' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>

              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default RegisterCustomer;