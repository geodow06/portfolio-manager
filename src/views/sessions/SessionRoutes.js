import Callback from "./Callback";
import NotFound from "./NotFound";
import SignIn from "./SignIn";


// Do not show topbar on session pages
const settings = {
  activeLayout: "layout",
  // Do not show topbar on session routes
  topbar: {
    show:false
  },
  // Do not show Navbar on session routes
  sideNavbar: {
    show:false,
    mode: "close"
  },
  // Do not show footer on session routes
  footer: {
    show: false
  }
};

// TODO
// Add SignUp, ForgotPassword
const sessionRoutes = [
    {
      path: "/session/404",
      component: NotFound,
      settings
    },
    {
      path: "/session/signin",
      component: SignIn,
      signin: true,
      settings
    },
    {
      path: "/session/callback",
      component: Callback,
      callback: true,
      settings
    }
];

export default sessionRoutes;