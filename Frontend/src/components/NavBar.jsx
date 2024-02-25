/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css'


function NavBar(props) {
    const navigate = useNavigate();

    const logout = () => {
        // console.log('clicked logout');
        localStorage.clear();
        props.setUser(null)
        navigate("/");

    }

    return (
        <>
            {props.user ? (
                <nav className="navbar navbar-expand-lg navbar-light bg-light px-5 p-2" >
                    {/* <div className="container"> */}
                    <div className="d-flex align-items-center">
                        <Link to="/">
                            <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 50 50" className="bi bi-cart animate__animated animate__wobble" data-bss-hover-animate="wobble" style={{ fontSize: '50px' }}>
                                <image xlinkHref="/auto.svg" width="50" height="50" />
                            </svg>
                        </Link>
                        <h2 className="nav-link navbar-brand ml-3" style={{
                            fontWeight: 'bold',
                            fontSize: '24px'
                        }}> AutoMate</h2>
                    </div>
                    <ul className="nav justify-content-end ml-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" style={{ color: "black" }}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={logout} style={{ color: "black" }}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                    {/* </div> */}
                </nav>
            ) : (
                <>
                </>
            )}
        </>
    );
}

export default NavBar