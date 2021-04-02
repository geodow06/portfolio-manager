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