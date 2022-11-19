import React from 'react';
import { Outlet } from 'react-router-dom';
import {Header} from '../components';

// type SearchContextType = {
//   searchValue: string;
//   setSearchValue: (value: string) => void;
// }


export const SearchContext = React.createContext<any>('');

const MainLayout: React.FC = () => {
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
