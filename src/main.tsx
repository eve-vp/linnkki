import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MovieGrid from './components/MovieGrid';
import Pagination from './components/Pagination';
import SearchMovie from './components/SearchMovie';
import OrderMovie from './components/OrderMovie';
// import MovieDetails from './components/MovieDetails';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="Movies" element={<MovieGrid />} />
        <Route path="Pagination" element={<Pagination currentPage={0} totalPages={0} onPageChange={() => {}} />} />
        <Route path="SearchMovie" element={<SearchMovie onSearch={() => {}} />} />
        <Route path="OrderMovie" element={<OrderMovie currentOrder="" onOrderChange={() => { } } availableOrders={[]} />} />
        {/* <Route path="Movies/:id" element={<MovieDetails />} /> */}

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
