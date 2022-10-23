import React from "react";



export default function Categories() {
const [activeIndex, setActiveIndex] = React.useState(2);
const onClickCategory = (index) => {
  setActiveIndex(index)
}
const categories = ['Все','Мясные','Вегетарианская', 'Гриль','Острые','Закрытые']
  
return (
    <div class="categories">
      <ul>
        {categories.map((cat, index) => 
        <li onClick={()=> onClickCategory(index)} className={activeIndex === index ? 'active' : ''}>{cat}</li>
        )}
      </ul>
    </div>
  );
}
