// import Navbar from './components/NavBar';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import axios from "axios"

import Alert from 'react-bootstrap/Alert';

const backend_api = import.meta.env.VITE_BACKEND_API

export default function Login() {
    const navigate = useNavigate();

    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [user, setUser] = useState({})

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    async function onSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post(`${backend_api}/login`, formData);

            // console.log('Response:', response.data.access_token);
            localStorage.setItem('user', response.data.access_token)
            setError(false)
            navigate("/");
        } catch (error) {
            setUser({});
            localStorage.clear();

            setError(true)
            if (error.message && !error.response) {
                setErrorMsg(error.message)
            }
            else if (error.response.status == 401) {

                setErrorMsg(error.response.data.msg)
            }
            else {


                setErrorMsg("Something went wrong")

            }



        }
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, [user]);

    function handleInputChange(event) {
        // console.log(formData);
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    return (
        <>
            <section className="vh-100" style={{ backgroundColor: '#296E73' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: '1rem' }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src="/bg_login.png"
                                            alt="login form"
                                            className="img-fluid"
                                            style={{ borderRadius: '1rem 0 0 1rem', height: '100%' }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form id="myform" onSubmit={onSubmit} >
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                    <span className="h1 fw-bold mb-0">AutoMate</span>
                                                </div>
                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        placeholder="m@example.com"
                                                        className="form-control form-control-lg"
                                                        onChange={handleInputChange}
                                                        value={formData.email}
                                                    />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example27">Password</label>
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        className="form-control form-control-lg"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>


                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg" type="submit" form="myform" style={{ backgroundColor: '#296E73' }}>Login</button>
                                                    {error ? <Alert variant="danger" className="m-2">
                                                        {errorMsg}
                                                    </Alert> : null}



                                                    <p className="mt-2 " style={{ color: '#393f81' }}>Do not have an account?
                                                        <Link to="/" style={{ color: '#393f81' }}>

                                                            Register

                                                        </Link></p>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}



