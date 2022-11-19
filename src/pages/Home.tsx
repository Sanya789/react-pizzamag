import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination/Pagination';
import { SearchContext } from '../layouts/MainLayout';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { sortList } from '../components/Sort';
import { fetchPizzas  } from '../redux/pizza/slice';
import { TFetchPizzasArgs  } from '../redux/pizza/types';
import { TRootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state:any) => state.filter);
  const { items, status } = useSelector((state:TRootState) => state.pizza);

  const sortType = sort.sortProperty;

  const { searchValue } = React.useContext(SearchContext);


  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue > 0 ? `&search=${searchValue}` : '';
    dispatch(
      fetchPizzas({ sortBy, order, category, search, currentPage })
      );
  };

  //Если первого рендера еще не было, то проверяем URL-параметры и сохранем в редакс

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //Если произошел первый рендер, то проверяем URL-параметры и сохранем в редакс

  React.useEffect(() => {
    if (window.location.search) {
      const params = (qs.parse(window.location.search.substring(1)) as unknown) as TFetchPizzasArgs;

      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          categoryId: Number(params.category),
  currentPage: Number(params.currentPage),
  sort: sort || sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то заправшиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items
    .filter((pizzaObject: any) => {
      if (pizzaObject.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((pizzaObject: any ) => (
        <PizzaBlock key={pizzaObject.id} {...pizzaObject} />
    ));

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
            Вероятней всего, пиццы не загрузились с сервера.
            <br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onPageChange={onChangePage} />
    </>
  );
};

export default Home;
