import React from 'react'
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/layout/Layout.tsx";
import IdentAnalysis from "./components/Analysis/IdentAnalysis.tsx";

var layout;
layout =  <Layout />;
const router = createHashRouter([
    {
        path: "/",
        element: layout,
        children: [
            {
                index: true,
                element: <IdentAnalysis />
            }
        ]
    }
]);


ReactDOM.createRoot(document.getElementById("app-root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);