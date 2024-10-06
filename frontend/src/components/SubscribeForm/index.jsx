import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscribeForm = () => {
  const [fondos, setFondos] = useState([]);
  const [clientes,setClientes] = useState([]);
  const [clienteId, setClienteId] = useState(1);
  const [fondoId, setFondoId] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/fondos/').then(response => {
      setFondos(response.data);
    });
    axios.get('http://localhost:8000/api/clientes/').then(response => {
      setClientes(response.data);
    });
    //console.log(clienteId)
  }, []);

  const handleSubmit = (accion) => {
    // console.log(fondoId)
    // console.log(clienteId)
    // console.log(accion)

    axios.post('http://localhost:8000/api/transacciones/', {
      tipo: accion,
      identificador:'',
      cliente: clienteId,
      fondo: fondoId,
      
    }).then(response => {
      console.log(response.data);
      setMessage(response);
    }).catch(error => {
      console.log(error.response.data);
      setMessage(error.response.data.tipo);
    });
  };

  return (
    <div>
      <h1>Suscribirse a un Fondo</h1>
      <form onSubmit={handleSubmit}>
        <div className='bg-black'>
          <label>
          Cliente:
          <select value={clienteId} onChange={e => {console.log(e.target.value); setClienteId(e.target.value)}}>
            {
            clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
            ))}
          </select>
          </label>
          {/* <input type="number" value={clienteId} onChange={e => setClienteId(e.target.value)} /> */}
        </div>
        <div>
          Seleccionar Fondo:
          <select value={fondoId} onChange={e => setFondoId(e.target.value)}>
            {fondos.map(fondo => (
              <option key={fondo.id} value={fondo.id}>{fondo.nombre}</option>
            ))}
          </select>
        </div>
        <button type="button" onClick={() => {handleSubmit("Apertura")}}>
          Suscribirse
        </button>
        <button type="button" onClick={() => {handleSubmit("Cancelacion")}}>
          Cancelar
        </button>
      </form>
      {message && <p>{JSON.stringify(message)}</p>}



    <form class="max-w-sm mx-auto">
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

    </div>
  );
};

export default SubscribeForm;
