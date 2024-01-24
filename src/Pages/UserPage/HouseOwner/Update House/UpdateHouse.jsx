
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../../Auth/CustomAuth";

const UpdateHouse = () => {
  const axiosSecure = useAxiosSecure();
  const {User} = useContext(AuthContext);
  const houseData = useLoaderData();
  const handelUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.Name.value,
      image: form.photoURL.value,
      address: form.Address.value,
      city: form.cityName.value,
      details: form.details.value,
      bedroom: form.totalBed.value,
      bathroom: form.totalBath.value,
      createdBy: User?.userEmail,
      size: form.totalsize.value,
      rent: form.rent.value,
      phone: form.phone.value,
      Deadline: form.deadline.value,
    };

    axiosSecure.put(`/house/${houseData._id}`, data).then((res) =>
      res?.data?.acknowledged
        ? Swal.fire({
            position: "center",
            icon: "success",
            title: "Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          })
        : Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          })
    );
  };

  return (
    <div>
      <h3 className=" mb-5 text-3xl md:text-4xl lg:text-5xl text-gray-900  font-bold">
        Update House
      </h3>

      <div>
        <form onSubmit={handelUpdate}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name of House
              </label>
              <input
                type="text"
                name="Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={houseData.name}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Photo URL
              </label>
              <input
                type="url"
                name="photoURL"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={houseData.image}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input
                type="text"
                name="Address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={houseData.address}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                City
              </label>
              <input
                type="text"
                name="cityName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={houseData.city}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Total Bedroom
              </label>
              <input
                type="number"
                name="totalBed"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={houseData.bedroom}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Total Bathroom
              </label>
              <input
                type="number"
                name="totalBath"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={houseData.bathroom}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Total size
              </label>
              <input
                type="number"
                name="totalsize"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={houseData.size}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Availablity Date
              </label>
              <input
                type="date"
                name="deadline"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                defaultValue={houseData.Deadline}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                House Description
              </label>
              <textarea
                name="details"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={houseData.details}
              ></textarea>
            </div>
            <div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Rent per month
                </label>
                <input
                  type="number"
                  name="rent"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={houseData.rent}
                  required
                ></input>
              </div>
              <div>
                <label className="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={houseData.phone}
                  required
                ></input>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className=" text-[#eb6753] border-2 w-full border-[#eb6753] px-4 py-2 md:px-5 md:py-2 font-semibold text-sm md:text-base rounded-md hover:bg-[#eb6753] hover:text-white"
          >
            Update House
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateHouse;
