import React, { useState } from 'react';
import './LoginForm.css'; // Ensure there's a corresponding CSS file for styling
import logo from "../../images/cgi_logo.png";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        preference: '', // Internship or Full-time
        state: '', // Using state abbreviation
        college: '',
        resume: null, // Added for resume file
    });

    // Array of U.S. state abbreviations
    const stateAbbreviations = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];

    const handleChange = (e) => {
        const { name } = e.target;
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // For demonstration, logging formData. You would replace this with your API call.
        console.log('Form data submitted:', formData);

        // If you need to send the data to a server:
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        // Example of sending the formDataToSend using fetch (replace 'YOUR_BACKEND_ENDPOINT' with your actual endpoint)
        // fetch('YOUR_BACKEND_ENDPOINT', {
        //     method: 'POST',
        //     body: formDataToSend,
        // }).then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error:', error));
    };

    return (
        <div className="JAYDEN">
            <div className="signup-container">
                <img src={logo} alt="Company logo" width="106.68" height="50" />
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h2>Create Account</h2>
                    <div className="form-control">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label>Employment</label>
                        <select name="preference" value={formData.preference} onChange={handleChange} required>
                            <option value="">Select...</option>
                            <option value="internship">Internship</option>
                            <option value="full-time">Full-Time</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="state">State</label>
                        <select id="state" name="state" value={formData.state} onChange={handleChange} required>
                            <option value="">Select...</option>
                            {stateAbbreviations.map(abbreviation => (
                                <option key={abbreviation} value={abbreviation}>{abbreviation}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="college">College</label>
                        <input
                            type="text"
                            id="college"
                            name="college"
                            value={formData.college}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                        <label htmlFor="locationPreferences">Location Preferences</label>
                        <input
                            type="text"
                            id="locationPreferences"
                            name="locationPreferences"
                            value={formData.locationPreferences}
                            onChange={handleChange}
                        />
                        </div>
                        <div className="form-control">
                            <label htmlFor="resume">Resume</label>
                            <input
                                type="file"
                                id="resume"
                                name="resume"
                                accept="application/pdf"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="button-container">
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
    
    export default Signup;
