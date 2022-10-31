import React from "react";



export default function Categories({value, onChangeCategory}) {
  console.log(value);

const categories = ['Все','Мясные','Вегетарианская', 'Гриль','Острые','Закрытые']
  
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
}
