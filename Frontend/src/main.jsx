import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import Login from "./Login.jsx";
import Landing from "./Landing.jsx";
import App from './App.jsx'
// import EditProfile from './EditProfile.jsx'


import './index.css'

// Live Link - https://udayp.live 


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Landing />,
  },
  {
    path: "/",
    element: <App />,
  },
  // {
  //   path: "/profile",
  //   element: <EditProfile />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);




