import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Profile = () => {
    const initialUserData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '',
        birthdate: 'January 1, 1990',
        state: 'California',
        city: '',
        address: '',
        occupation: 'Developer',
    };

    const [userData, setUserData] = useState(initialUserData);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState(initialUserData);

    const handleUpdateClick = () => {
        setIsUpdateMode(true);
        setUpdatedUserData(userData);
    };

    const handleCancelUpdate = () => {
        setIsUpdateMode(false);
    };

    const handleSaveUpdate = () => {
        setUserData(updatedUserData);
        setIsUpdateMode(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow max-w-4xl mx-auto my-6 p-4 bg-white shadow-lg rounded-md">
                <h2 className="text-2xl text-center font-semibold mb-6">Profile</h2>
                <div className="bg-gray-100 p-4 rounded-md mb-6">
                    {isUpdateMode ? (
                        <>
                            <div className="mb-6">
                                <label htmlFor="name">Name: </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={updatedUserData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email">Email: </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={updatedUserData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="phone">Phone No: </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={updatedUserData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="birthdate">Birthdate: </label>
                                <input
                                    type="text"
                                    id="birthdate"
                                    name="birthdate"
                                    value={updatedUserData.birthdate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="state">State: </label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={updatedUserData.state}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="city">City: </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={updatedUserData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="address">Address: </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={updatedUserData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-12">
                                <label htmlFor="occupation">Occupation: </label>
                                <input
                                    type="text"
                                    id="occupation"
                                    name="occupation"
                                    value={updatedUserData.occupation}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
                                    onClick={handleSaveUpdate}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                                    onClick={handleCancelUpdate}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-6">
                                <strong>Name:</strong> {userData.name}
                            </div>
                            <div className="mb-6">
                                <strong>Email:</strong> {userData.email}
                            </div>
                            <div className="mb-6">
                                <strong>Phone No:</strong> {userData.phone}
                            </div>
                            <div className="mb-6">
                                <strong>Birthdate:</strong> {userData.birthdate}
                            </div>
                            <div className="mb-6">
                                <strong>State:</strong> {userData.state}
                            </div>
                            <div className="mb-6">
                                <strong>City:</strong> {userData.city}
                            </div>
                            <div className="mb-6">
                                <strong>Address:</strong> {userData.address}
                            </div>
                            <div className="mb-12">
                                <strong>Occupation:</strong> {userData.occupation}
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="bg-black text-white py-2 px-4 rounded-md mr-2"
                                    onClick={handleUpdateClick}
                                >
                                    Update
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
