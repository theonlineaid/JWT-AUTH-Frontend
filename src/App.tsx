import { useState } from 'react';
import Dropdown from './components/Dropdown';
import ProductCard from './components/ProductCard';
import { useAuth } from './context/AuthContext'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import CustomSelect from './components/CustomSelect';

function App() {
  const { user, logout } = useAuth(); // Get the logout function from context
  const navigate = useNavigate(); // Create an instance of useNavigate
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      navigate('/auth/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  console.log(user)

 

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

      <ProductCard />


      <div style={{ padding: '50px' }}>
        <h1>Select a Category</h1>
        <Dropdown />
      </div>


      <div>
      <h1>Custom Select Dropdown</h1>
      <CustomSelect
        options={['Option 1', 'Option 2', 'Option 3']}
        selectedValue={selectedOption}
        onChange={handleSelectChange}
      />
    </div>


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
