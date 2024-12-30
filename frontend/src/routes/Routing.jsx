import { createBrowserRouter, } from "react-router-dom";
import ProtectedRouteArray from "./ProtectedRouteArray";
import PublicRouteArray from "./PublicRouteArray";

const routes = createBrowserRouter([
  ...PublicRouteArray,
  ...ProtectedRouteArray
])

export default routes;
