import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Auth/CustomAuth";
import axios from "axios";
import Swal from "sweetalert2";

const Details = () => {
  const houseData = useLoaderData();
  const { User } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    axios
      .get(`https://house-rent-server-chi.vercel.app/user/${User?.userEmail}`)
      .then((res) => setCurrentUser(res.data));
  }, [User?.userEmail]);

  const handelRent = (e) => {
    if (currentUser?.Rent.length >= 2) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "You cant take rent more than 2 house at a time",
      });
    } else {
      e.preventDefault();
      const RentDetails = {
        name: houseData.name,
        image: houseData.image,
        RentID: houseData._id,
        address: houseData.address,
        price: houseData.rent,
        ownerNumber: houseData.phone,
        ownerEmail: houseData.createdBy,
      };
      // Updating UserAPI
      const updateUser = {
        name: currentUser?.name,
        email: currentUser?.email,
        phone: currentUser?.phone,
        role: currentUser?.role,
        password: currentUser?.password,
        Rent: [...currentUser.Rent, RentDetails],
      };
      axios
        .put(`https://house-rent-server-chi.vercel.app/user/${User?.userEmail}`, updateUser)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              title: `Request is completed`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  return (
    <div>
      <div className="md:grid grid-cols-2 p-4 gap-10 max-w-6xl m-auto py-10 border-b-2 border-[#eb6753]">
        <div>
          <img className=" mb-5" src={houseData?.image} alt="" />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl md:text-4xl text-gray-900 lg:text-5xl font-bold">
            {houseData?.name}
          </h3>
          <p className="text-2xl md:text-2xl text-gray-900 lg:text-3xl font-bold">
            Rent : <span className="text-[#eb6753]">{houseData?.rent}</span> BDT
          </p>
          <p className="text-gray-900 text-lg font-semibold">
            Location : {houseData?.address}
          </p>
          <p className="text-gray-900 text-lg font-semibold">
            CIty : {houseData?.city}
          </p>
          <p className="text-gray-900 text-lg font-semibold">
            Bedroom : {houseData?.bedroom}
          </p>
          <p className="text-gray-900 text-lg font-semibold">
            Bathroom : {houseData?.bathroom}
          </p>
          <p className="text-gray-900 text-lg font-semibold">
            Flat size : {houseData?.size} sqf
          </p>
          <p className="text-gray-900 text-lg font-semibold">
            Owner phone number : {houseData?.phone}
          </p>
          <p className="text-gray-900 text-lg font-semibold">
            Owner Email : {houseData?.createdBy}{" "}
          </p>

          {User?.userRole == "House Renter" ? (
            <button
              onClick={handelRent}
              className="mt-5 border-2 border-[#eb6753] text-white bg-[#eb6753] hover:bg-white hover:text-[#eb6753] font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Request For Rent Now
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <button className="btn" disabled="disabled">
                Request For Rent Now
              </button>
              <p className="text-red-700 text-xs">
                Only House Renter can rent house
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="max-w-6xl p-4 m-auto">
        <b>Details</b> : {houseData?.details}
      </p>
    </div>
  );
};

export default Details;
