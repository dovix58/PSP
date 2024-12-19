import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LandingPage from "./LandingPage";
import CateringPage from "./CatringPage";
import BeautyPage from "./BeautyPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/catering',
        element: <CateringPage />
    },
    {
        path: "/beauty",
        element: <BeautyPage/>
    }
]);
ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
