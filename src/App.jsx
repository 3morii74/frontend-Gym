import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import PrivateRoute from './auth/PrivateRoute';
import Welcome from './pages/Welcome';
import NavBar from './component/NavBar';

function App() {
  const [navColor, setNavColor] = useState('transparent');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setNavColor("bg-primary"); // Home color
    } else if (location.pathname === '/workout') {
      setNavColor('#457B9D'); // Workout color
    } else {
      setNavColor('transparent'); // Default color for other pages
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <NavBar backgroundColor={navColor} />
              <Main />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
