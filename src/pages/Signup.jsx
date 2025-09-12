import React, { useState } from 'react';
import InputBox from '../components/Input';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';

const ROLE_OPTIONS = ['MANAGER', 'DEVELOPER', 'ADMIN', 'TESTER'];

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ROLE_OPTIONS[0],
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    console.log('Signup payload:', payload);

    try {
      const response = await fetch('http://localhost:8585/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Success response:', data);
      setStatusMessage('Signup successful!');
      navigate('/Signin'); // Navigate only after successful signup
    } catch (error) {
      console.error('Signup failed:', error);
      setStatusMessage(`Signup failed: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-900 rounded-md shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-white">Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <InputBox
          label="Username"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          className="mb-4"
          inputClassName="text-white placeholder-white"
          labelClassName="text-white"
        />

        <InputBox
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4"
          inputClassName="text-gray-800 placeholder-gray-400"
          labelClassName="text-white"
        />

        <InputBox
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="mb-4"
          inputClassName="text-white placeholder-gray-300"
          labelClassName="text-white"
        />

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-white mb-1"
          >
            Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-yellow-100 border border-gray-600 rounded-md transition duration-200
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                       text-gray-800"
          >
            {ROLE_OPTIONS.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <Button title="Sign Up" variant="signup" />

        {/* Link to Sign In */}
        <div className="mt-4 text-center text-white text-sm">
          Already have an account?{" "}
          <Link to="/Signin" className="text-yellow-400 hover:underline">
            Sign In
          </Link>
        </div>
      </form>

      {/* Optional status message */}
      {statusMessage && (
        <div className="mt-4 text-sm text-yellow-300 text-center">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default Signup;
