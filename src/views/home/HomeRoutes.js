import { GeodowLoadable } from "geodow";

const Home = GeodowLoadable({
    loader: () => import("./Home")
})

const homeRoutes = [
    {
        path: "/dashboard/home",
        exact: true,
        component: Home
    }
];

export default homeRoutes;