import { useRoutes, BrowserRouter } from "react-router-dom";

import React from "react";
import "./App.css";
import Home from "../home";
import UserProfile from "../../components/UserProfile";


const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home/> },
    { path: "/profile", element: <UserProfile/> },

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