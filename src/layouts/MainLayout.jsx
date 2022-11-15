import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export const SearchContext = React.createContext('');

const MainLayout = ({ children }) => {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div>
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <div className="container">
              <Outlet />
            </div>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
};

export default MainLayout;
