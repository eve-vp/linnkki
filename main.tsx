import React from 'react';
import {
  BrowserRouter, 
  Routes, 
  Route 
} from 'react-router-dom';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import MovieGrid from './components/MovieGrid';
import './index.css';
import Pagination from './components/Pagination';
import SearchMovie from './components/SearchMovie';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

// const routing = (
  root.render(
<React.StrictMode>
<BrowserRouter>
  <Routes>

    <Route path="/" element={<App />} />
    <Route path="Movies" element={<MovieGrid />} />
    <Route path="Pagination" element={<Pagination currentPage={0} totalPages={0} onPageChange={function (): void {
            throw new Error('Function not implemented.');
          } } />} />
    <Route path="SearchMovie" element={<SearchMovie onSearch={function (): void {
            throw new Error('Function not implemented.');
          } } />} />

  </Routes> 
</BrowserRouter>
</React.StrictMode>

);

// "*" wildcard route to match any path