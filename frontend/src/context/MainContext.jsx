import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [fondos, setFondos] = useState([]);
    const [clientes, setClientes] = useState([]);
  
  
    useEffect(() => {
      axios.get("http://localhost:8000/api/fondos/").then((response) => {
        setFondos(response.data);
      });
      axios.get("http://localhost:8000/api/clientes/").then((response) => {
        setClientes(response.data[0]);
      });
      // console.log('clientes:  ')
      // console.log(clientes)
    }, []);

  return (
    <DataContext.Provider value={{ 
        clientes,
        fondos, 
        }}>
            
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
