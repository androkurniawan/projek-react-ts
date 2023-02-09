import React, {useEffect, useState} from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate: NavigateFunction = useNavigate();
  const [, setCookie] = useCookies(['username']);

  const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
  }

  const handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
  }

  const expireDate: Date = new Date();
  expireDate.setDate(expireDate.getDate() + 7);

  const cookieOptions = {
      path: '/',
      expires: expireDate,
      // sameSite: 'strict',
      secure: true,
  };

  useEffect(() => {
      if (document.cookie) {
        navigate("/");
      }
  })

  const clickHandler = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic " + btoa(email + ":" + password));

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          // redirect: 'follow'
      };

      fetch("http://127.0.0.1:5000/login", requestOptions)
          .then((response) => response.json())
          .then((result) => {
              if (result.message === 'success' && result.user === 'customer') {
                  alert("Login success as Customer.")
                  localStorage.setItem('role', result.user)
                  setCookie("username", result.token, cookieOptions)
                  navigate("/")
              } else if (result.message === 'success' && result.user === 'hotel') {
                  alert("Login success as Hotel.")
                  localStorage.setItem('role', result.user)
                  setCookie("username", result.token, cookieOptions)
                  navigate("/")
              } else {
                  alert("GAGAL MASUK, tapi Berhasil fetching.")
              }
          })
          .catch((error) => {
              alert('Incorrect email address or password.')
              console.log(error)
          });
  }
  
  return (
    <MDBContainer className="p-5 my-5 h-custom">

      <MDBRow className="justify-content-center">

        <MDBCol col='4' md='3'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p style={{color: "#ffc300"}} className="lead fw-bold mb-0 me-3">Sign in with</p>

            <MDBBtn color="none" floating size='md' tag='a' href='http://www.facebook.com' className='me-2'>
              <MDBIcon fab icon='facebook-f' size="md" />
            </MDBBtn>

            <MDBBtn color="none" floating size='md' tag='a' href='http://www.twitter.com'  className='me-2'>
              <MDBIcon fab icon='twitter' size="md" />
            </MDBBtn>

            <MDBBtn color="none" floating size='md' tag='a' href='https://accounts.google.com/v3/signin/identifier?dsh=S-2096941787%3A1671854281143008&hl=id&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AeAAQh6phgv47elB6puOnrIIoRwtwzJsT4q5p-0gc0g_6ZHQ2CM3dxNCBocL4ZfShTZaj1Uu66Mz' className='me-2'>
              <MDBIcon fab icon='google' size='md'/>
            </MDBBtn>

          </div>

          <div className="divider d-flex align-items-center my-3 justify-content-center">
            <p className="text-center fw-normal mx-5 mb-0">or</p>
          </div>
          
          <label>Username</label>
          <MDBInput onChange={handleChangeEmail} wrapperClass='mb-3' id='formControlLg' type='email' size="md"/>

          <label>Password</label>
          <MDBInput onChange={handleChangePassword} wrapperClass='mb-3' id='formControlLg' type='password' size="md"/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-5'>
            <MDBBtn onClick={clickHandler} className="mb-0 px-5" size='md'>Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/register-customer" className="link-danger">Register</a></p>
          </div>

        </MDBCol>

      </MDBRow>


    </MDBContainer>
  );
}

export default Login;