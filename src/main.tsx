import React from 'react';
import {
  BrowserRouter, 
  Routes, 
  Route 
} from 'react-router-dom';
import { createRoot } from 'react-dom/client'; 
import App from './App.tsx';
import MovieTable from './components/MovieTable.tsx';
import './index.css';

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
    <Route path="*" element={<MovieTable />} />

  </Routes> 
</BrowserRouter>
</React.StrictMode>
);

// "*" wildcard route to match any path