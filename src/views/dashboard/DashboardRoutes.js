import { GeodowLoadable } from "geodow";

const Dashboard = GeodowLoadable({
    loader: () => import("./Dashboard")
});

const dashboardRoutes = [
    {
        path: "/dashboard/home",
        component: Dashboard
    }
];

export default dashboardRoutes;