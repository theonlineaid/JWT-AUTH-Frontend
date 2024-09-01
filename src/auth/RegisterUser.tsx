import React, { useState } from "react";

interface RegisterUser {
  email: string;
  password: string;
  name: string;
}

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData: RegisterUser = {
      email,
      password,
      name,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        // Parse JSON response for error details
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      setSuccess("User registered successfully!");
      setError(null);
      console.log(result);
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
      console.error("Registration error:", err);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <div className="mb-6">
            <input
              type="text"
              id="username"
              name="username"
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
      {/* <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Register;
