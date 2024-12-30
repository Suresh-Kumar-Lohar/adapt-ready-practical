import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./routes/Routing";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer position="top-right" />
    </>
  )
}

export default App;
