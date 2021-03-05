import { authRoles } from "auth/authRoles";
import { GeodowLoadable } from "geodow";

const Home = GeodowLoadable({
    loader: () => import("./Home")
})

const homeRoutes = [
    {
        path: "/dashboard/home",
        component: Home,
        auth: authRoles.admin
    }
];

export default homeRoutes;