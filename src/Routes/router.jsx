import {
    createBrowserRouter
  } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import Home from "../Pages/Home";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Pages/Login";
import AddTask from "../Pages/AddTask";
import PrivateRoutes from "./PrivateRoutes";
const router = createBrowserRouter([
    {path: "/",
    element: <Layouts></Layouts>,
    children: [
      {
        path: "/",
        element: <PrivateRoutes><Home></Home></PrivateRoutes>
      },
      {
        path: "/add-task",
        element: <AddTask></AddTask>,
      }
    
    
    ]}
      ,
      {
        path: "auth",
        element: <AuthLayouts></AuthLayouts>,
        children: [
          {
            path: "/auth/login",
            element: <Login></Login>,
          }
        ]}
  ]);


export default router;