import { authRoles } from "auth/authRoles";
import { GeodowLoadable } from "geodow";

const Dashboard = GeodowLoadable({
    loader: () => import("./Dashboard")
});

const dashboardRoutes = [
    {
        path: "/dashboard/home",
        component: Dashboard,
        auth: authRoles.employee
    }
];

export default dashboardRoutes;