import { useState } from 'react';
import axios from 'axios';

const backend_api = import.meta.env.VITE_BACKEND_API

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        age: '',
        gender: 'male',
        preferredGender: 'female',
        ageCategory: '18-25',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backend_api}/register`, formData);

            console.log('Response:', response.data);
            history.push('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div>
                <h2>Set Up Profile</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
                    <input type="number" name="age" placeholder="Age" onChange={handleInputChange} />
                    <label>
                        Gender:
                        <select name="gender" onChange={handleInputChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-disclose">Do Not Wish to Disclose</option>
                        </select>
                    </label>
                    <label>
                        Preferred Gender:
                        <select name="pgender" onChange={handleInputChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-disclose">Do Not Wish to Disclose</option>
                        </select>
                    </label>
                    <label>
                        Age Category:
                        <select name="pagegrp" onChange={handleInputChange}>
                            <option value="1">18-25</option>
                            <option value="2">26-35</option>
                            <option value="3">36-45</option>
                            <option value="4">46-55</option>
                            <option value="5">56+</option>
                        </select>
                    </label>
                    <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                    <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                    <button type="submit">Create Profile</button>
                </form>
            </div>
        </>
    );
}

export default Register;
