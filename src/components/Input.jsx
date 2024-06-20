import React from "react";
// import PropTypes from "prop-types";

function Input({ value, onChange, name, place, type, label }) {
    return (
        <div>
            <label>{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} placeholder={place} />
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
