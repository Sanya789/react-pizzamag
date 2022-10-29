import React from 'react'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('http://demo9688379.mockable.io/items')
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false)
      });
      window.scrollTo(0, 0)
  }, []);

  return (
    <>
    <div className="content__top">
      <Categories />
      <Sort />
    </div>
    <h2 className="content__title">Все пиццы</h2>
    <div className="content__items">
      {isLoading
        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
        : items.map((pizzaObject) => <PizzaBlock key={pizzaObject.id} {...pizzaObject} />)}
    </div>
  </>
  )
}

export default Home;
