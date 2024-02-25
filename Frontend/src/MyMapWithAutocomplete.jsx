/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import UserModal from './components/UserModal';

const backend_api = import.meta.env.VITE_BACKEND_API

function MyMapWithAutocomplete(props) {
    const autocompleteRef = useRef(null);
    const [open, setopen] = useState(false)
    const [destination, setDestination] = useState(false)


    const onLoad = (autocomplete) => {
        // console.log('autocomplete: ', autocomplete);
        autocompleteRef.current = autocomplete;
    }

    const onPlaceChanged = async () => {
        if (autocompleteRef.current !== null) {
            try {
                const response = await axios.post(`${backend_api}/destination`, autocompleteRef.current.getPlace());
                // console.log('Response:', response.data);
                setDestination(response.data)
                setopen(true)
                // navigate("/");
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // console.log('Autocomplete is not loaded yet!');
        }
    }

    return (
        <>
            {open ? <UserModal destination={destination} userLocation={props.userLocation} setopen={setopen} /> :
                <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={onPlaceChanged}
                >
                    <div style={{ position: 'fixed', top: '75px', left: '50%', transform: 'translateX(-50%)', width: '240px' }}>
                        <input
                            type="text"
                            placeholder="Enter Destination"
                            style={{
                                boxSizing: 'border-box',
                                width: '100%',
                                height: '40px',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                                fontSize: '16px',
                                outline: 'none',
                            }}
                        />
                        <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                            <i className="fas fa-search" style={{ fontSize: '20px', color: '#777' }}></i>
                        </div>
                    </div>
                </Autocomplete>
            }
        </>

    );
}

export default MyMapWithAutocomplete;
