import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, NavLink, useLocation, NavigateFunction, useNavigate } from 'react-router-dom';

function Navbar() {
    const oracleLogo: string = require("../assets/img/oracle.png")
    const pathName: string = useLocation().pathname;
    const token: string = document.cookie;
    const [username, setUsername] = useState<string>();
    const navigate: NavigateFunction = useNavigate();

    const activeLink: () => string = () => {
        const path = [
            '/profile-customer',
            '/update-profile-customer',
            '/change-password-customer',
            '/profile-hotel',
            '/update-profile-hotel',
            '/change-password-hotel'
        ]
        if (path.includes(pathName)) {return "nav-link active px-3"}
        return "nav-link px-3"
    }

    useEffect(() => {
        if (token) {
            let splitToken = token.split(".");
            let user = JSON.parse(atob(splitToken[1]));
            let username = user["user"];
            setUsername(username);
        }
    }, [token])

    // useEffect(() => {
    //     window.scrollTo({top: 0, behavior: "smooth"})
    // })

    const goToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    useEffect(() => {
        goToTop()
    }, [pathName])

    const logout = () => {
        document.cookie = "username=; expires= Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        localStorage.removeItem("role")
        navigate("/")
    }

    $(function(){
        $(document).scroll(function(){
            var $nav: JQuery<HTMLElement> = $(".navbar");
            if ($(this).scrollTop()! > $nav.height()!) {
                $nav.addClass("scrolled");
                $nav.removeClass("navbar-dark");
                $nav.addClass("navbar-light");
            } else {
                $nav.removeClass("scrolled");
                $nav.addClass("navbar-dark");
                $nav.removeClass("navbar-light");
            }
            });
        })
    
    return (
        <header className="navbar sticky-top navbar-dark navbar-expand-lg main-nav">
            <div className="container">
                <Link className="navbar-brand" to="/" onClick={goToTop}>
                    <img src={oracleLogo} alt="Oracle" width="160" height="20" />
                </Link>
            
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto py-3">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                onClick={goToTop}
                                className={({isActive}) => isActive? "nav-link active px-3" : "nav-link px-3"}
                                aria-current="page"
                            >
                                Home
                            </NavLink>
                        </li>

                        <li
                            style={{display: localStorage.getItem('role') ? "none" : "block"}}
                            className="nav-item">
                            <NavLink
                                className={({isActive}) => isActive? "nav-link active px-3" : "nav-link px-3"}
                                to="/register-hotel"
                                onClick={goToTop}
                            >
                                Join Us
                            </NavLink>
                        </li>

                        <li
                            style={{display: localStorage.getItem('role') ? "none" : "block"}}
                            className="nav-item">
                            <NavLink
                                to="/login"
                                className={({isActive}) => isActive? "nav-link active px-3" : "nav-link px-3"}
                            >
                                Register|Login
                            </NavLink>
                        </li>

                        <li
                            style={{display: localStorage.getItem('role') === 'customer' ? "block" : "none"}}
                        >
                            <NavLink
                                className={({isActive}) => isActive? "nav-link active px-3" : "nav-link px-3"}
                                to="/mybooking"
                                onClick={goToTop}
                            >
                                My Booking
                            </NavLink>
                        </li>

                        <li
                            style={{display: localStorage.getItem('role') ? "block" : "none"}}
                        >
                            <NavLink
                                to={localStorage.getItem('role') === 'hotel' ? "/profile-hotel" : "/profile-customer"}
                                className={activeLink}
                                onClick={goToTop}
                            >
                                {localStorage.getItem('role') ? 'Profile' : 'gagal'}
                            </NavLink>
                        </li>

                        <li style={{display: (document.cookie) ? "block" : "none"}} className='nav-item'>
                            <Dropdown className="btn-group px-3">
                                <Dropdown.Toggle data-bs-toggle="dropdown" aria-expanded="false" className="btn btn-md dropdown-toggle" style={{backgroundColor: "#ffd60a", borderRadius: "25px", color:"black"}} id="dropdown-basic">
                                    {username}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={logout}><span><i className="fa-solid fa-right-from-bracket"></i>Logout</span></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>

                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar;