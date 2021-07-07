import React from "react";
import { Redirect } from "react-router-dom";
import dashboardRoutes from "views/dashboard/dashboardRoutes.js";
import sessionRoutes from "views/sessions/sessionRoutes.js";

const redirectRoute = [{
    path: "/",
    exact: true,
    component: () => < Redirect to = "/dashboard/home" />
}];

const errorRoute = [{
    path: "*",
    component: () => < Redirect to = "/session/404" />
}];

const routes = [
    ...sessionRoutes,
    ...dashboardRoutes,
    ...redirectRoute,
    ...errorRoute
];

export default routes;