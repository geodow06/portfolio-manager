import React from "react";
import { Redirect } from "react-router-dom";
import homeRoutes from "views/home/HomeRoutes";
import sessionRoutes from "views/sessions/SessionRoutes";

const redirectRoute = [
    {   
        path: "/",
        exact: true,
        component: () => <Redirect to="/dashboard/home" />
    }
];

const errorRoute = [
    {
        path:"*",
        exact:true,
        component: () => <Redirect to="/session/404" />
    }
]



const routes = [
    ...sessionRoutes,
    ...homeRoutes,
    ...redirectRoute,
    ...errorRoute
];

export default routes;