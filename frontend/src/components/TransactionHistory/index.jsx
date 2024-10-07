import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionHistory = ({ clienteId }) => {
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/transacciones/?cliente=${clienteId}`)
      .then((response) => {
        setTransacciones(response.data);
      });
  }, [clienteId]);

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-3xl">
        Tu Historial de Inversiones: Controla y Optimiza Tus Fondos
      </h1>
      <ul>
        {transacciones.map((transaccion) => (
          <li key={transaccion.identificador}>
            {transaccion.tipo} en {transaccion.fondo.nombre} el{" "}
            {new Date(transaccion.fecha).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
