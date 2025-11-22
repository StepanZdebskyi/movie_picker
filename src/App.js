import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom"
import { Container, Switch } from '@mui/material';

import './App.css'
import MainPageHeader from './components/MainPageHeaderComponent/MainPageHeader';
import SimpleBottomNavigation from './components/MainNavComponent/SimpleBottomNavigation';
import Movies from './components/Pages/MoviesComponent/Movies'
import Trending from './components/Pages/TrendingComponent/Trending'
import Series from './components/Pages/SeriesComponent/Series'
import Search from './components/Pages/SearchComponent/Search'
import Watchlist from './components/Pages/WatchlistComponent/Watchlist';

const theme = createTheme();

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainPageHeader />

        <div className="App">
          <Container>
            <Routes>
              <Route path='/' Component={Trending} exact></Route>
              <Route path='/movies' Component={Movies}></Route>
              <Route path='/series' Component={Series}></Route>
              <Route path='/search' Component={Search}></Route>
              <Route path='/watchlist' Component={Watchlist}></Route>
            </Routes>
          </Container>
        </div>

        <SimpleBottomNavigation />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
