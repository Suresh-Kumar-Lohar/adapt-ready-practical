import React from "react";
import ProtectedRoute from "./ProtectedRoute";

const ProtectedRouteArray = [
  {
    path: "/profile-details",
    element: (
      <ProtectedRoute>
        {/* <DetailsPage /> */}
      </ProtectedRoute>
    ),
  }
];

export default ProtectedRouteArray;
