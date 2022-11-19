import React from 'react';
import Loadable from 'react-loadable';
import './App.css';
import './scss/app.scss';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
// import FullPizza from './components/FullPizza';
// import MainLayout from './layouts/MainLayout';

// const Cart = React.lazy(()=> import('./pages/Cart'))
const FullPizza = React.lazy(()=> import('./components/FullPizza'))
const MainLayout = React.lazy(()=> import('./layouts/MainLayout'))

const Cart = Loadable({
  loader: () => import('./pages/Cart'),
  loading: () => <div>Loading...</div>,
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={
        <React.Suspense 
        fallback={<div>Loading...</div>}>
          <Cart />
          </React.Suspense>} />
        <Route path="/pizza/:id" element={
        <React.Suspense 
        fallback={<div>Loading...</div>}>
          <FullPizza />
          </React.Suspense>} />
        <Route path="*" element={
        <React.Suspense 
        fallback={<div>Loading...</div>}>
          <NotFound />
        </React.Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
