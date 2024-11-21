import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Verification from './pages/verification';
import Main from './pages/Main';
import PrivateRoute from './auth/PrivateRoute';
import Welcome from './pages/Welcome';
import NavBar from './component/NavBar';
import AppInitializer from './auth/AppInitializer';
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
      <AppInitializer>
        <div className="min-h-screen">
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/verification"
              element={
                <Verification />
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <React.Fragment>
                    <NavBar backgroundColor={navColor} />
                    <Main />
                  </React.Fragment>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AppInitializer>
    </>
  );
}

export default App;
