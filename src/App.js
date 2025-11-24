import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import './App.css';
import MainPageHeader from './components/MainPageHeaderComponent/MainPageHeader';
import SimpleBottomNavigation from './components/MainNavComponent/SimpleBottomNavigation';
import Movies from './components/Pages/MoviesComponent/Movies';
import Trending from './components/Pages/TrendingComponent/Trending';
import Series from './components/Pages/SeriesComponent/Series';
import Search from './components/Pages/SearchComponent/Search';
import Watchlist from './components/Pages/WatchlistComponent/Watchlist';
import Login from './components/Pages/LoginComponent/Login'; // Import the new Login page

const theme = createTheme();

// Layout for authenticated pages
const AppLayout = () => {
  return (
    <>
      <MainPageHeader />
      <div className="App">
        <Container>
          <Outlet />
        </Container>
      </div>
      <SimpleBottomNavigation />
    </>
  );
};

// Protected Route Wrapper
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  // FIX: Initialize state by checking sessionStorage directly
  // This function runs only once when the app loads (or reloads)
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    const user = localStorage.getItem('userName');
    return user !== null; // Returns true if user exists, false if not
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          {/* Public Route: Login */}
          {/* If already logged in, redirect away from login page to home */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout />
              </ProtectedRoute>
            }>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
