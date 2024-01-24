import { useContext } from 'react';
import logo from '/src/assets/header-logo.svg'
import { AuthContext } from '../Auth/CustomAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
  const{User, logout}= useContext(AuthContext);
  const handleLogout = () =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1f2937",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out"
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Logout!",
          confirmButtonColor: "#eb6753",
          text: "You have been Logouted.",
          icon: "success"
        });
      }
    });
  }
    const manuItem = (
        <>
          <li>{User? <a className="hover:bg-transparent hover:underline decoration-[#eb6753] px-2 text-white" href='/dashboard/myhouses'>DashBoard</a>:null}</li>
          <li>{User? <a className="hover:bg-transparent hover:underline decoration-[#eb6753] px-2 text-white" onClick={handleLogout}>Log Out</a>: <a className="hover:bg-transparent hover:underline decoration-[#eb6753] px-2 text-white" href={"/signin"}>Sign in</a>}</li>
        </>
      );

      return (
        <div className='sticky top-0 bg-gray-800 z-50 '>
          <div className="navbar max-w-7xl m-auto px-5 ">
            <div className="navbar-start">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 items-center "
                >
                  {manuItem}
                </ul>
              </div>
              <a className='max-w-56' href="/" >
               <img src={logo} alt="" />
              </a>
            </div>
            
            <div className="navbar-end">
            <div className="hidden md:flex"><ul className=" menu-horizontal px-1 font-semibold ">{manuItem}</ul></div>
            </div>
          </div>
        </div>
      );
};

export default Navbar;