import ProductCard from './components/ProductCard';
import { useAuth } from './context/AuthContext'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function App() {
  const { user, logout } = useAuth(); // Get the logout function from context
  const navigate = useNavigate(); // Create an instance of useNavigate

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      navigate('/auth/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  console.log(user)

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

      <ProductCard />
      
      <button
        onClick={handleLogout}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default App;
