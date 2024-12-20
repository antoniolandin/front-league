import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Ranking from "./pages/Ranking";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Team from "./pages/Team";
import Player from "./pages/Player";
import Fantasy from "./pages/Fantasy";
import FantasyRanking from "./pages/FantasyRanking";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/ranking", element: <Ranking /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { path: "/equipo/:id", element: <Team /> },
  { path: "/jugador/:id", element: <Player /> },
  { path: "/fantasy/:id", element: <Fantasy /> },
  { path: "/fantasy/ranking", element: <FantasyRanking /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
