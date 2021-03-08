import NotFound from "./NotFound";
import SignIn from "./SignIn";


// Do not show topbar on session pages
const settings = {
  activeLayout: "layout",
  topbar: {
    show:false
  }
}

// TODO
// Add SignIn, SignUp, ForgotPassword
const sessionRoutes = [
    {
      path: "/session/404",
      component: NotFound,
      settings
    },
    {
      path: "/session/signin",
      component: SignIn,
      settings
    }
];

export default sessionRoutes;