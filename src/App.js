import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import './App.css';
import './scss/app.scss';
import PizzaBlock from './components/PizzaBlock';
import pizzas from './assets/pizzas.json';

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            {pizzas.map((pizzaObject) => (
              <PizzaBlock {...pizzaObject} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
