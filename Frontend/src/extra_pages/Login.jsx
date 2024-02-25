import { useState } from 'react';
import axios from 'axios';

const backend_api = import.meta.env.VITE_BACKEND_API

function Login({ setlogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [isLoggedIn, setLoggedIn] = useState(false);


    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { email, password };
            const response = await axios.post(`${backend_api}/login`, data);
            setlogin(true)
            // console.log('Response:', response.data);

        } catch (error) {
            // console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
