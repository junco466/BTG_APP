import React, { useState, useEffect } from "react";
import axios from "axios";

const SubscribeForm = () => {
  // const [fondos, setFondos] = useState([]);
  // const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState(1);
  const [fondoId, setFondoId] = useState(1);
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/fondos/").then((response) => {
  //     setFondos(response.data);
  //   });
  //   axios.get("http://localhost:8000/api/clientes/").then((response) => {
  //     setClientes(response.data);
  //   });
  //   //console.log(clienteId)
  // }, []);
  const { clientes } = useContext(DataContext);

  const handleSubmit = (accion) => {
    // console.log(fondoId)
    // console.log(clienteId)
    // console.log(accion)

    axios
      .post("http://localhost:8000/api/transacciones/", {
        tipo: accion,
        identificador: "",
        cliente: clienteId,
        fondo: fondoId,
      })
      .then((response) => {
        console.log(response.data);
        setMessage(response);
      })
      .catch((error) => {
        console.log(error.response.data);
        setMessage(error.response.data.tipo);
      });
  };

  return (
    <div className="m-10">

      <div className="subs-header m-7">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Potencia Tu Futuro: 
        </span>{" "}
      </h1>
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-3xl">
          ¡Suscríbete a los Fondos de Inversión de BTG Pactual!
        </h2>
      <p className="text-lg font-normal text-gray-500 lg:text-base dark:text-gray-400">
      Empieza a invertir hoy y asegura tu futuro con los Fondos Voluntarios de Pensión y los Fondos de Inversión Colectiva de BTG Pactual. Obtén los mejores rendimientos, diversifica tu capital y disfruta de beneficios exclusivos mientras alcanzas tus metas financieras. ¡Suscríbete y toma el control de tu futuro!  
      </p>
      </div>

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="user"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cliente:
          </label>
          <select
            id="user"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={clienteId}
            onChange={(e) => {
              console.log(e.target.value);
              setClienteId(e.target.value);
            }}
            required
          >
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="subscripcion"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Seleccionar Fondo
          </label>
          <select
            id="subscripcion"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={fondoId}
            onChange={(e) => setFondoId(e.target.value)}
            required
          >
            {fondos.map((fondo) => (
              <option key={fondo.id} value={fondo.id}>
                {fondo.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-around">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              handleSubmit("Apertura");
            }}
          >
            Suscribirse
          </button>

          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              handleSubmit("Cancelacion");
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
      {message && <p>{JSON.stringify(message)}</p>}
    </div>
  );
};

export default SubscribeForm;
