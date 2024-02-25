import { useState, useEffect } from 'react';
import axios from 'axios';

const backend_api = import.meta.env.VITE_BACKEND_API

function EditProfile() {
    const [formData, setFormData] = useState({
        username: '',
        age: '',
        gender: 'male',
        preferredGender: 'female',
        ageCategory: '18-25',
        email: '',
        password: '',
    });

    useEffect(() => {

        async function fetchUserProfile() {
            try {
                const response = await axios.get(`${backend_api}/edit_profile`); //URL WRONG
                const userProfile = response.data;

                // Update the formData state with the user's profile data
                setFormData({
                    username: userProfile.username,
                    age: userProfile.age,
                    gender: userProfile.gender,
                    preferredGender: userProfile.preferredGender,
                    ageCategory: userProfile.ageCategory,
                    email: userProfile.email,
                });
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${backend_api}/edit-profile`, formData); // Use PUT method for updating the profile

            // console.log('Response:', response.data);
        } catch (error) {
            // console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} />
                <label>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-disclose">Do Not Wish to Disclose</option>
                    </select>
                </label>
                <label>
                    Preferred Gender:
                    <select name="preferredGender" value={formData.preferredGender} onChange={handleInputChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-disclose">Do Not Wish to Disclose</option>
                    </select>
                </label>
                <label>
                    Age Category:
                    <select name="ageCategory" value={formData.ageCategory} onChange={handleInputChange}>
                        <option value="18-25">18-25</option>
                        <option value="26-35">26-35</option>
                        <option value="36-45">36-45</option>
                        <option value="46-55">46-55</option>
                        <option value="56+">56+</option>
                    </select>
                </label>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default EditProfile;
