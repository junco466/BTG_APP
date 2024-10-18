import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [fondos, setFondos] = useState([]);
    const [clientes, setClientes] = useState([]);

    const fetchClientes = () => {
      axios.get("http://localhost:8000/api/clientes/").then((response) => {
        setClientes(response.data);
      });
    };

    useEffect(() => {
      axios.get("http://localhost:8000/api/fondos/").then((response) => {
        setFondos(response.data);
      });
      fetchClientes();
    }, []);

  return (
    <DataContext.Provider value={{ 
        clientes,
        fondos,
        fetchClientes, 
        }}>

      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
