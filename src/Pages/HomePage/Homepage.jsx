import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/CustomAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Homepage = () => {
  const { User, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [houseData, sethouseData] = useState([]);
  useEffect(() => {
    axiosSecure.get(`/houses`).then((res) => {
      res?.data.length > 0 ? sethouseData(res?.data) : null;
    });
  }, [User?.userEmail, axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-[400px] grid content-center justify-center">
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#eb6753]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-7xl font-bold">Loading....</h1>
      </div>
    );
  } else {
    return (
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 px-3 gap-3">
        {houseData?.map((house) => (
          <div
            key={house?._id}
            className="mt-5 mb-5 relative abc bg-gray-200 border border-gray-200 hover:border-[#eb6753] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="relative">
              <img
                className="p-2 max-h-[200px] w-full"
                src={house.image}
                alt="product image"
              />

              <p className="absolute bottom-4 left-4 bg-white p-1 rounded-md text-sm font-bold">
                BDT {house.rent} /<span className="text-xs">Month</span>
              </p>
            </div>
            <div className="px-5 pb-7 ">
              <h5 className="text-xl font-semibold text-left tracking-tight text-gray-900 dark:text-white">
                {house.name}
              </h5>

              <p className="py-1">{house.address}</p>

              <div className="flex items-center justify-between">
                
              <span className=" border-2 border-[#eb6753] bg-white text-[#eb6753] font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Bed: {house?.bedroom}
                  </span>
                <span className=" border-2 border-[#eb6753] bg-white text-[#eb6753] font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Bath: {house?.bathroom}
                  </span>


                <Link to={`/details/${house._id}`}>
                  <button className=" border-2 border-[#eb6753] text-white bg-[#eb6753] hover:bg-white hover:text-[#eb6753] font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Details
                  </button>
                </Link>

              </div>
              <img
                className=" w-10/12 border-none def hidden absolute bottom-0 "
                src="https://themeholy.com/wordpress/pizzan/wp-content/themes/pizzan/assets/img/fire.png"
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Homepage;
