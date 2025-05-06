import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/app/Dashboard/Dashboard";
import { Signin } from "./pages/auth/Signin";
import { AppLayout } from "./_layouts/app";
import { AuthLayout } from "./_layouts/auth";
import { Signup } from "./pages/auth/Signup";
import { Orders } from "./pages/app/Orders/Orders";
import { NotFound } from "./pages/404";

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <AppLayout/>,
        errorElement: <NotFound/>,
        children: [
            {path: "/", element: <Dashboard/>},
            {path: "/orders", element: <Orders/>}
        ]
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