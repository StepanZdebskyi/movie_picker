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

// 1. Create a Layout Component for authenticated pages
// This ensures Header and Nav only show up when logged in
const AppLayout = () => {
  return (
    <>
      <MainPageHeader />
      <div className="App">
        <Container>
          {/* Outlet renders the child route (Trending, Movies, etc.) */}
          <Outlet />
        </Container>
      </div>
      <SimpleBottomNavigation />
    </>
  );
};

// 2. Create a Protected Route wrapper
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  // State to track login status
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          {/* PUBLIC ROUTE: Login */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          {/* PROTECTED ROUTES */}
          {/* We wrap the AppLayout inside the protection check */}
          <Route
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout />
              </ProtectedRoute>
            }>
            {/* These components will replace <Outlet /> in AppLayout */}
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
