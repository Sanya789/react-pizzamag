import React from "react";

type CategoriesProps = {
value: number;
onChangeCategory: any;
}


 const Categories: React.FC<CategoriesProps> = ({value, onChangeCategory}) => {
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

export default Categories;
