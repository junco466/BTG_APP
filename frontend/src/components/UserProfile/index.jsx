import React, { useContext } from "react";
import axios from "axios";
import DataContext from "../../context/MainContext";

const UserProfile = () => {
  
  const { clientes, fondos } = useContext(DataContext);

  if (!clientes || !fondos || clientes.length === 0 || fondos.length === 0) {
    return <div>Loading...</div>;
  }
  // console.log("asdasdasd")
  console.log(clientes[0])
  //const cliente = clientes[0]

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* Profile Picture and Name */}
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="text-xl font-bold">{clientes[0].nombre}</h2>
          <p className="text-gray-500">ID: {clientes[0].id}</p>
        </div>
      </div>

      {/* Change Password */}
      <button className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 11c0-1.1.9-2 2-2s2 .9 2 2v1m-4 0v1m0 4h8a2 2 0 002-2v-5a2 2 0 00-2-2h-1m-10 7H4a2 2 0 01-2-2v-5a2 2 0 012-2h1m6 7v1m0-4V7m6 4h-1m0 0V6a2 2 0 10-4 0v5"
          />
        </svg>
        CHANGE PASSWORD
      </button>

      {/* Form */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        {/* Saldo */}
        <div className="grid grid-rows-3 gap-4">
          <div>
            <label className="block text-gray-700">Saldo: </label>
            <label className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              {clientes[0].saldo}
            </label>
          </div>
          {/* Email */}
          <div>
            <label className="block text-gray-700">Email: </label>
            <label className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              {clientes[0].email}
            </label>
          </div>
          {/* Telefono */}
          <div>
            <label className="block text-gray-700">Telefono:</label>
            <label className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              {clientes[0].telefono}
            </label>
          </div>
        </div>

        {/* Fonods inscritos */}
        <div>
          <label className="block text-gray-700">Fondos inscritos</label>
          <select className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>Designer</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
