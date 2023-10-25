
import { useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
    height: "400px",
    width: "1500px"
}

const center = {
    lat: 38.685,
    lng: -115.234
}

function MyMapWithAutocomplete() {
    const autocompleteRef = useRef(null);

    const onLoad = (autocomplete) => {
        console.log('autocomplete: ', autocomplete);
        autocompleteRef.current = autocomplete;
    }

    const onPlaceChanged = async () => {
        if (autocompleteRef.current !== null) {
            // console.log(autocompleteRef.current.getPlace());
            // console.log(autocompleteRef.current.getPlace().geometry.location.lng());

            try {

                const response = await axios.post("http://127.0.0.1:5000/destination", autocompleteRef.current.getPlace());

                console.log('Response:', response.data);

            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    }

    return (

        // <Autocomplete
        //     onLoad={onLoad}
        //     onPlaceChanged={onPlaceChanged}
        // >
        //     <input
        //         type="text"
        //         placeholder="Enter Destination"
        //         style={{
        //             boxSizing: `border-box`,
        //             border: `1px solid transparent`,
        //             width: `240px`,
        //             height: `32px`,
        //             padding: `0 12px`,
        //             borderRadius: `3px`,
        //             boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        //             fontSize: `14px`,
        //             outline: `none`,
        //             textOverflow: `ellipsis`,
        //             position: "absolute",
        //             left: "50%",
        //             marginLeft: "-120px"
        //         }}
        //     />
        // </Autocomplete>
        <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
        >
            <div style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', width: '240px' }}>
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




    );
}

export default MyMapWithAutocomplete;
