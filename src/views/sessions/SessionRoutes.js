import NotFound from "./NotFound";
import SignIn from "./SignIn";


// TODO
// Add SignIn, SignUp, ForgotPassword
const sessionRoutes = [
    {
      path: "/session/404",
      component: NotFound,
    },
    {
      path: "/session/signin",
      component: SignIn
    }
];

export default sessionRoutes;