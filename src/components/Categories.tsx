import React from "react";


type CategoriesProps = {
value: number;
onChangeCategory: (id: number)=> void;
}
const categories = ['Все','Мясные','Вегетарианская', 'Гриль','Острые','Закрытые']


export const Categories: React.FC<CategoriesProps> = React.memo(({value, onChangeCategory}) => {
    
  return (
      <div className="categories">
        <ul>
          {categories.map((cat, index) => 
          <li 
          key={index}
          onClick={()=> onChangeCategory(index)} 
          className={value === index ? 'active' : ''}>
            {cat}
          </li>
          )}
        </ul>
      </div>
    );
  })

