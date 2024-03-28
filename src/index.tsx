import React from 'react'
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import {
    FluentProvider,
    webLightTheme,
    Button
} from "@fluentui/react-components";
import Layout from "./pages/layout/Layout.tsx";
import IdentAnalysis from "./components/Analysis/IdentAnalysis.tsx";
import Body from "./components/Body/Body.tsx"
var layout;
layout =  <Layout />;
const router = createHashRouter([
    {
        path: "/",
        element: layout,
        children: [
            {
                index: true,
                element: <Body />
            }
        ]
    }
]);


ReactDOM.createRoot(document.getElementById("app-root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);