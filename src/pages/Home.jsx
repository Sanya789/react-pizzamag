import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue > 0 ? `&search=${searchValue}` : '';


    fetch(
      `https://635d6c8ab13fd8c8607d9d23.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

  const pizzas = items
  .filter((pizzaObject) => {
    if(pizzaObject.title.toLowerCase().includes(searchValue.toLowerCase())) {
      
      return true
    } else {
      return false
    }
  })
  .map((pizzaObject) => <PizzaBlock key={pizzaObject.id} {...pizzaObject} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(type) => setSortType(type)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination/>
    </>
  );
};

export default Home;
