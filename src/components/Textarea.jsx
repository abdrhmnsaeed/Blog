function Textarea({ value, onChange, name, place, label }) {
    return (
        <div className="input-container">
            {label && <label htmlFor={name}>{label}</label>}
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={place}
                className="textarea-field"
            />
        </div>
    );
}

export default Textarea
