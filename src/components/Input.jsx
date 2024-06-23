import React from "react";
// import PropTypes from "prop-types";

function Input({ value, onChange, name, place, type, label }) {
    return (
        <div className="input-container">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={place}
                className="input-field"
            />
        </div>
    );
}



// Input.propTypes = {
//     value: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired,
//     name: PropTypes.string.isRequired,
//     place: PropTypes.string,
//     type: PropTypes.string.isRequired,
//     label: PropTypes.string
// };

export default Input;
