import React from "react";
import {
  DishDetailPage,
  HomePage
} from "../pages";
import { Navigate } from "react-router-dom";

const PublicRouteArray = [
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/dish/:dishId",
    element: <DishDetailPage />
  },
  {
    path: "*",
    element: <Navigate to="/home" />
  }
];

export default PublicRouteArray;
