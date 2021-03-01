import React from "react";
import { Redirect } from "react-router-dom";
import homeRoutes from "views/home/HomeRoutes";

const redirectRoute = [
    {   
        path: "/",
        exact: true,
        component: () => <Redirect to="/dashboard/home" />
    }
];

const routes = [
    ...homeRoutes,
    ...redirectRoute,
];

export default routes;