import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/reduxStore';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ShoppingListPage from './pages/ShoppingLists';
import HomePage from './pages/HomePage';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';

const useAuth = () => {
  // Replace with your authentication logic
  return !!localStorage.getItem('authToken');
};

function App() {
  const isAuthenticated = useAuth();

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />
          {/* <Route path="/banner" element={<ProtectedRoute element={<HomePage />} />} /> */}
          <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/shopping-list" element={<ProtectedRoute element={<ShoppingListPage />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
