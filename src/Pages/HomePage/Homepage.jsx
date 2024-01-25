import { useContext, useEffect, useState } from "react";
import { AuthContext } from "/src/Auth/CustomAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";

const Homepage = () => {
  const { User, loading } = useContext(AuthContext);
  const axiosPublic = useAxios();
  const [houseData, sethouseData] = useState([]);
  useEffect(() => {
    axiosPublic.get(`/houses`).then((res) => {
      res?.data.length > 0 ? sethouseData(res?.data) : null;
    });
  }, [User?.userEmail, axiosPublic]);

  // Search
  const [searchingItem, setsearchingItem] = useState(true);
  const [searchHouse, setSearchHouse] = useState([]);
  const [searching, setsearching] = useState(false);
  const [value, setValue] = useState();
  const handleSearch = (e) => {
    e.preventDefault();
    setValue(e.target.search.value);
    if (e.target.search.value === "" || e.target.search.value === " ") {
      setsearching(false);
    } else {
      setsearching(true);
    }
    axios
      .get("https://house-rent-server-chi.vercel.app/allhouse/search", {
        params: {
          query: e.target.search.value.toLowerCase(),
        },
      })
      .then((response) => {
        setSearchHouse(response?.data);

        if (response?.data.length === 0) {
          setsearchingItem(false);
        } else {
          setsearchingItem(true);
        }
      })
      .catch((error) => {
        console.error("Error searching for items:", error);
      });
  };

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
      <div className="max-h-screen">
        {/* Banner/search */}
        <div
          style={{
            backgroundImage:
              "url(https://homez-reactjs.ibthemespro.com/assets/home-1-22d28a2d.jpg)",
          }}
          className="bg-cover bg-no-repeat  py-10 bg-center "
        >
          <div className="top-0 left-0 w-full relative">
            <div className="max-w-7xl p-5 md:p-10 m-auto md:flex items-center gap-5 ">
              <div className="md:w-7/12 lg:w-6/12 space-y-5">
                <p className="text-[#eb6753] text-xl italic">
                THE BEST WAY TO
                </p>
                <h2 className="text-3xl z-0 md:text-5xl text-[#eb6753] font-bold">
                Find Your Dream Home
                </h2>
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      name="search"
                      id="default-search"
                      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-[#eb6753] rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search with Contest name..."
                    />
                    <button
                      type="submit"
                      className="absolute right-2.5 bottom-2 focus:ring-4 focus:outline-none focus:ring-[#eb675363] font-medium rounded-lg text-sm px-4 py-2 border-2 border-[#eb6753] text-white bg-[#eb6753] hover:bg-white hover:text-[#eb6753]  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>

              <div className="md:w-5/12 lg:w-6/12"></div>
            </div>
          </div>
        </div>

        {/* Search Items */}
        {searching ? (
          <div className="mt-16">
            <div className="text-center pb-7">
              <h3 className="text-2xl md:text-4xl font-bold">
                Your Search Result
              </h3>
            </div>
            <div className=" max-w-7xl -mt-10 m-auto px-5">
              {searchingItem ? (
                <div className="grid  md:grid-cols-2 lg:grid-cols-3 px-3 gap-3">
                  {searchHouse?.map((house) => (
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
                          BDT {house.rent} /
                          <span className="text-xs">Month</span>
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
              ) : (
                <div className="py-12 mt-10 border-2 border-black">
                  <h1 className="text-xl md:text-3xl text-center my-4 font-extrabold dark:text-white">
                    No Contest found using &quot;{value}&quot;
                  </h1>
                </div>
              )}
            </div>
            <div className="text-center"></div>
          </div>
        ) : null}

        <div>

        <div className="text-center pt-10 pb-2">
              <h3 className="text-2xl md:text-4xl font-bold">
                All Available Houses
              </h3>
            </div>

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
        </div>
      </div>
    );
  }
};

export default Homepage;
