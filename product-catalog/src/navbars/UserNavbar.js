import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const UserNavbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        // Clear local storage and navigate to login page
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={handleMenuClick}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="navbar-brand" to="/">
                                Product Catalog App User
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                onClick={handleDropdownClick}
                            >
                                User CRUD
                            </a>
                            <ul
                                className={`dropdown-menu ${showDropdown ? 'show' : ''}`}
                                aria-labelledby="navbarDropdown"
                            >
                                <li>
                                    <Link className="dropdown-item" to="/viewUserCategories">
                                        View Categories
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/userCart">
                                        My Cart
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/viewUserOrders">
                                        My Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/viewProfile">
                                        My Profile
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <button
                        className="btn btn-primary"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default UserNavbar;
