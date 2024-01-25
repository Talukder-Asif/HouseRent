import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Auth/CustomAuth";

const Dashboard = () => {
    const {User} = useContext(AuthContext);
    return (
        <div>    
          <div className="max-w-7xl m-auto relative lg:flex flex-nowrap flex-col md:flex-row my-3 lg:my-10 mx-3 min-h-[80vh]">
            <div className="lg:w-[20%]">
              <ul className="menu-horizontal gap-1 flex-wrap justify-center lg:menu">
                {/* House Owner  */}
                {
                  User?.userRole == "House Owner"?
                  <>
                  <li className="mb-4 ">
                  <NavLink
                    className="bg-[#eb6753] text-sm rounded-2xl px-3  py-1 text-white border-2 lg:text-base border-[#eb6753]hover:text-white lg:hover:text-[#eb6753]"
                    to={"/dashboard/myhouses"}
                  >
                    My Houses
                  </NavLink>
                </li>
                  <li className="mb-4 ">
                  <NavLink
                    className="bg-[#eb6753] text-sm rounded-2xl px-3  py-1 text-white border-2 lg:text-base border-[#eb6753]hover:text-white lg:hover:text-[#eb6753]"
                    to={"/dashboard/addhouse"}
                  >
                    Add New House
                  </NavLink>
                </li>
                
                  </>
                  :
                  null
                }
    
    
                {/* House Renter  */}
                {
                  User?.userRole === "House Renter" ?
                  <>
                  <li className="mb-4 ">
                  <NavLink
                    className="bg-[#eb6753] text-sm rounded-2xl px-3  py-1 text-white border-2 lg:text-base border-[#eb6753]hover:text-white lg:hover:text-[#eb6753]"
                    to={"/dashboard/mybooking"}
                  >
                    My Bookings
                  </NavLink>
                </li>
                  </>
                  :
                  null
                }
              </ul>
            </div>
    
            <div className="lg:w-[80%] px-3 lg:border-4 lg:border-black">
              <div className="lg:py-3">
                <Outlet></Outlet>
              </div>
            </div>
          </div>
        </div>
      );
};

export default Dashboard;