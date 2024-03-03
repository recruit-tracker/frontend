import React, { useState } from 'react';
import './ForgetPw.css';
import logo from "../../images/cgi_logo.png";

const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Reset link sent to:', email);
        // Implement actual reset logic here
    };

    return (
      <div class="JOSHIE">
        <div className="reset-password-container">
          <div className="reset-form">
            <form onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="button-container">
                    <button type="submit">Send Reset Link</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
};

export default ResetPassword;
