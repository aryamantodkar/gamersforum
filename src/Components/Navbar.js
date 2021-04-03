import React from "react";
import './Navbar.css';
import Cookies from 'js-cookie';
function Navbar() {
    const logoutHandler = (e) => {
        e.preventDefault();
        Cookies.remove('authtoken');
        localStorage.clear('name');
        window.location.replace('/login');
    }
    return (
        <div className='navnav'>
            <nav className="mb-1 navbar navbar-expand-lg navbar-dark ">
                <a className="navbar-brand" href={"/"}>
                    <h1>GamersForum</h1>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent-4"
                    aria-controls="navbarSupportedContent-4"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            id="navbarDropdownMenuLink-4"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{color: "white"}}
                        >
                        <i className="fas fa-user"></i> {localStorage.getItem('name')}{" "}
                    </a>
                    <div
                        className="dropdown-menu dropdown-menu-right dropdown-info"
                        aria-labelledby="navbarDropdownMenuLink-4"
                    >
                        <button className="dropdown-item" onClick={logoutHandler} style={{cursor: "pointer"}}>
                            <span style={{color: "black"}}>Logout</span>
                        </button>
                        </div>
                    </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}   
export default Navbar;
