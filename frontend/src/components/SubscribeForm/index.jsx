import React, { useContext, useState, useEffect } from "react";
import DataContext from "../../context/MainContext";
import axios from "axios";

const SubscribeForm = () => {
  const [clienteId, setClienteId] = useState(1);
  const [fondoId, setFondoId] = useState(1);
  const [message, setMessage] = useState("");

  const { clientes, fondos, fetchClientes } = useContext(DataContext);

  if (!clientes || !fondos || clientes.length === 0 || fondos.length === 0) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (accion) => {
    axios
      .post("http://localhost:8000/api/transacciones/", {
        tipo: accion,
        identificador: "",
        cliente: clienteId,
        fondo: fondoId,
      })
      .then((response) => {
        if (accion == 'Apertura'){
          setMessage(`Usted se ha registrado al fondo ${fondos[fondoId].nombre} satisfactoriamente. Costo: ${fondos[fondoId].monto_minimo}`)
        }else{
          setMessage(`Usted ha cancelado el fondo ${fondos[fondoId].nombre}. Devolucion: ${fondos[fondoId].monto_minimo}`);
        }
        fetchClientes();
      })
      .catch((error) => {
        console.log(error.response.data);
        setMessage(error.response.data);
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
          Empieza a invertir hoy y asegura tu futuro con los Fondos Voluntarios
          de Pensión y los Fondos de Inversión Colectiva de BTG Pactual. Obtén
          los mejores rendimientos, diversifica tu capital y disfruta de
          beneficios exclusivos mientras alcanzas tus metas financieras.
          ¡Suscríbete y toma el control de tu futuro!
        </p>
      </div>

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>

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
