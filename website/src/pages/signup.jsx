// Filename - pages/signup.js

import React from "react";

const SignUp = () => {
	const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      // Handle sign-in logic here
      console.log('Sign In:', { email, password });
    } else {
      // Handle sign-up logic here
      if (password === confirmPassword) {
        console.log('Sign Up:', { email, password });
      } else {
        alert('Passwords do not match');
      }
    }
  };

  return (
    <div className="container">
      <div className="auth-toggle">
        <button onClick={() => setIsSignIn(true)} className={isSignIn ? 'active' : ''}>Sign In</button>
        <button onClick={() => setIsSignIn(false)} className={!isSignIn ? 'active' : ''}>Sign Up</button>
      </div>
      <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        {!isSignIn && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">{isSignIn ? 'Sign In' : 'Sign Up'}</button>
      </form>
    </div>
  );
};

export default SignUp;
