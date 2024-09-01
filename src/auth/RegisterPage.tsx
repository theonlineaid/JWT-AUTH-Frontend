import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth(); 


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.register({name,email,password});

      // Automatically log in the user after successful registration
      await login({ email, password });
      navigate('/');
    } catch (error: any) {
         // Handle error from backend
         if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Registration failed. Please try again.');
        }
        console.error('Registration failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-lg px-10">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-6">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-gray-300 text-white placeholder-gray-300 text-lg rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="Username"
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-gray-300 text-white placeholder-gray-300 text-lg rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-gray-300 text-white placeholder-gray-300 text-lg rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-purple-600 px-4 py-3 rounded-full font-semibold hover:bg-gray-200 focus:outline-none transition duration-200"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center text-white mt-6">
          Already have an account?{" "}
          <Link to={'/auth/login'} className="text-white underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;