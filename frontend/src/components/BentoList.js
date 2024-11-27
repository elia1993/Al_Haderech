import React, { useEffect, useState } from 'react';
import bentoService from '../services/bentoService';  // Importing the bentoService

const BentoList = () => {
  const [bentos, setBentos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBentos = async () => {
      try {
        const data = await bentoService.getBentoItems();
        setBentos(data);
      } catch (err) {
        setError('Failed to load Bento items.');
      }
    };

    fetchBentos();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <h1>Bento Items</h1>
      <ul>
        {bentos.map((bento) => (
          <li key={bento.id}>{bento.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BentoList;
