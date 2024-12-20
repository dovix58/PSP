import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./LandingPage";
import CateringPage from "./CatringPage";
import BeautyPage from "./BeautyPage";
import LoginPage from "./LoginPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '/catering',
        element: <CateringPage />
    },
    {
        path: '/home',
        element: <LandingPage />
    },
  {
    path: "/beauty",
    element: <BeautyPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
