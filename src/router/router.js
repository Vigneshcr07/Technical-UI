import Index from "../pages/dashboard";
import Login from "../pages/login/Login";

const authProtectedRoutes = [
  {
    path: "/",
    component: <Login />,
    publicRoutes: true,
  },
  {
    path: "/dashboard",
    component: <Index />,
    publicRoutes: false,
  },
];

export { authProtectedRoutes };
