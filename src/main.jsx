import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MainLayout from "./LayOut/MainLayout";
import Homepage from "./Pages/HomePage/Homepage";
import Signup from "./Pages/SignUp/Signup";
import CustomAuth from "./Auth/CustomAuth";
import SignIn from "./Pages/SignIn/SignIn";
import Dashboard from "./Pages/UserPage/Dashboard";
import AddHouse from "./Pages/UserPage/HouseOwner/AddHouse/AddHouse";
import MyHouse from "./Pages/UserPage/HouseOwner/MyHouse/MyHouse";
import UpdateHouse from "./Pages/UserPage/HouseOwner/Update House/UpdateHouse";
import Details from "./Pages/Details/Details";
import MyBooking from "./Pages/UserPage/House Renter/MyBooking/MyBooking";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Homepage></Homepage>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path:"/details/:id",
        element: <Details></Details>,
        loader: ({params})=> fetch(`https://house-rent-server-chi.vercel.app/house/${params.id}`)
      },
      {
        path:"/dashboard",
        element:<PrivateRoute>
          <Dashboard></Dashboard>
        </PrivateRoute>,
        children:[
          {
            path:"/dashboard/myhouses",
            element: <MyHouse></MyHouse> ,
          },
          {
            path:"/dashboard/addhouse",
            element: <AddHouse></AddHouse>
          },
          {
            path:"/dashboard/update/:id",
            element: <UpdateHouse></UpdateHouse>,
            loader: ({params})=> fetch(`https://house-rent-server-chi.vercel.app/house/${params.id}`)
          },
          {
            path:"/dashboard/mybooking",
            element:<MyBooking></MyBooking>
          }
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomAuth>
      <RouterProvider router={router} />
    </CustomAuth>
  </React.StrictMode>
);
