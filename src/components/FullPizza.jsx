import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://635d6c8ab13fd8c8607d9d23.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (err) {
        console.log(err);
        alert('Ошибка при получении данных о пицце');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка...';
  }
  return (
    <div>
      <img src={pizza.imageUrl} alt="pizza_img" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} p</h4>
    </div>
  );
};

export default FullPizza;
