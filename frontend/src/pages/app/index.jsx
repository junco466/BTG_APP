import { useRoutes, BrowserRouter } from "react-router-dom";

import React from "react";
import "./App.css";
import Home from "../home";


const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home/> },

  ]);

  return routes;
};

const App = () => {
    return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;