import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../../navbars/UserNavbar';

const ViewProfile = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const [userProfile, setUserProfile] = useState({ ...currentUser });
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    const handleSave = () => {
        // Update user profile in JSON file via API
        axios
            .put(`/actors/${userProfile.id}`, userProfile)
            .then((response) => {
                // Assuming the API updates the profile successfully
                localStorage.setItem('currentUser', JSON.stringify(userProfile));
                setIsEditing(false);
            })
            .catch((error) => {
                console.error('Error updating user profile:', error);
            });
    };

    return (
        <div>
            <UserNavbar />
            <div className="container mt-4">
                <h2 className="mb-4">User Profile</h2>
                <table className="table" style={{ width: '60%' }}>
                    <tbody>
                        <tr>
                            <th>Username:</th>
                            <td>
                                {isEditing ? (
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="username"
                                        value={userProfile.username}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{userProfile.username}</span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Password:</th>
                            <td>
                                {isEditing ? (
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        value={userProfile.password}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{userProfile.password}</span>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-3">
                    {isEditing ? (
                        <button className="btn btn-success" onClick={handleSave}>Save</button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;
