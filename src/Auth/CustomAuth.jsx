/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);
const CustomAuth = ({ children }) => {
const [loading, setloading] = useState(true);
const [relode, setReload] = useState(false);
const [User, setUser] = useState(null);
const setLocalStore =(email, role) =>{
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
    window.location.href = "/dashboard";
}
      // Create an Account with Email and Password
  const createUser = (email, name, phone, password, role) => {
    setloading(true);
    const userData = {
        name: name,
        email: email,
        phone: phone,
        role: role,
        password: password,
        Rent:[]
      }
      axios.post('http://localhost:5000/user', userData)
      .then(res=> res.data.insertedId?
        Swal.fire({
            icon: "success",
            title: "Sign up successfully",
            showConfirmButton: false,
            timer: 2000,
          })
          : 
          Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "User Already Exists",
                  confirmButtonColor: "#f72c00",
                })
    );
    setLocalStore(email, role)
  };


    // Set user Data
    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        const userRole = localStorage.getItem('role');
        setloading(false);
        userEmail? setUser({userEmail, userRole}) : setUser(false);
      }, [relode]);



  // Login with email and password
  const login = (email, password) => {
    setloading(true);
    axios.get(`http://localhost:5000/user/${email}`)
    .then(res=> {
      res.data.email === email ?
        res.data.password === password ?
        setLocalStore(email, res.data.role):
        Swal.fire({
          icon: "error",
          title: "Wrong Password",
          text: "Try Again with another password",
          confirmButtonColor: "#f72c00",
        }):
        Swal.fire({
          icon: "error",
          title: "Wrong Email",
          text: "Try Again with another Email",
          confirmButtonColor: "#f72c00",
        })
    })
    
  };


  // Logout
  const logout = () => {
    setReload(!relode)
    localStorage.clear();
  }


  const userInfo = { loading, login, createUser, User, logout };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default CustomAuth;
