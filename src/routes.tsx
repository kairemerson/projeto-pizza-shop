import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/app/Dashboard";
import { Signin } from "./pages/auth/Signin";
import { AppLayout } from "./_layouts/app";
import { AuthLayout } from "./_layouts/auth";
import { Signup } from "./pages/auth/Signup";

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <AppLayout/>,
        children: [{path: "/", element: <Dashboard/>}]
    },
    {
        path: "/", 
        element: <AuthLayout/>,
        children: [
            {path: "/sign-in", element: <Signin/>},
            {path: "/sign-up", element: <Signup/>}
        ]
    }
])