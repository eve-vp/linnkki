// OrderMovie.tsx
import React, { useState } from 'react';
import { OrderMovieProps } from '../services/interfaces';
import { fetchMovies } from '../services/data';

const OrderMovie: React.FC<OrderMovieProps> = ({ currentOrder, onOrderChange, availableOrders }) => {
  const [orderTerm, setOrderTerm] = useState<string>(currentOrder);
// Estado para el término de orden actual

 // Manejador de evento para el cambio de orden
  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderTerm(e.target.value); // Actualiza el estado del término de orden
  };
// Manejador de evento para enviar el formulario de orden
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
  
    if (!orderTerm) {
      // Muestra una alerta si no se selecciona un término de orden válido
      alert('Please select a valid order term');
      return;
    }
  
    const normalizedOrderTerm = orderTerm.endsWith('.asc') || orderTerm.endsWith('.desc')
      ? orderTerm
      : `${orderTerm}.desc`;
  
    try {
      await fetchMovies({
        page: 1,
        selectedGenre: '', 
        currentOrder: '',
        orderTerm: normalizedOrderTerm, // Realiza la solicitud de películas con el término de orden normalizado
      });
  
      onOrderChange(normalizedOrderTerm); // Llama a la función de cambio de orden con el término de orden normalizado
    // Maneja errores relacionados con el cambio de orden
    } catch (error) {
      console.error('Error handling order:', error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="orderSelect"> </label>
      <select id="orderSelect" value={orderTerm} onChange={handleOrderChange}>
        {availableOrders.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button type="submit" className="search-button">
        Order Movies
      </button>
    </form>
  </div>
);
}
export default OrderMovie;
