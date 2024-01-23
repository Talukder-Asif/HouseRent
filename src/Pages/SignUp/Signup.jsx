import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/CustomAuth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, seterror] = useState(null);
  const navigate = useNavigate();

  const {createUser, User} = useContext(AuthContext);
  console.log(User)
  const handelSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.Phone.value;
    const role = form.Role.value;
    const password = form.password.value;
    

    seterror(null);
    if (password.length < 6) {
      seterror(null);
      return seterror("Password must be at least 6 characters long.");
    }

    // Check if the password contains at least one capital letter
    if (!/[A-Z]/.test(password)) {
      return seterror("Password must contain at least one capital letter.");
    }

    // Check if the password contains at least one special character
    if (!/[!@#$%^&*()_+{}\\[\]:;<>,.?~\\-]/.test(password)) {
      return seterror("Password must contain at least one special character.");
    }
        axios.post('http://localhost:5000/jwt', email, {withCredentials:true})
        .then(res=> console.log(res.data))
        createUser(email, name, phone, password, role)
        navigate("/");
  };

  return (
    <div>
      <div className=" max-w-2xl m-auto my-5 mt-[20%] p-5">
        <h3 className="text-2xl md:text-3xl text-gray-900 mb-5 lg:text-4xl font-bold">
          Create a account
        </h3>
        <div>
          <form onSubmit={handelSignup}>
            <div className="grid grid-cols-2 mb-5 gap-5">
              <div className="">
                <input
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="">
                <input
                  type="tel"
                  name="Phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your phone Number"
                  required
                />
              </div>
              <div className="">
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your Email Address"
                  required
                />
              </div>
              <div className="">
                <input
                  type="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="">
              <span className="label-text">Pick the best fantasy franchise</span>
                <select name="Role" className="select select-bordered w-full max-w-xs">
                  <option defaultValue>House Renter</option>
                  <option >House Owner</option>
                </select>
              </div>
            </div>
            {error ? <p className="text-red-600 py-2">{error}</p> : ""}
            <button
              type="submit"
              className=" text-[#eb6753] border-2 w-full border-[#eb6753] px-4 py-2 md:px-5 md:py-2 font-semibold text-sm md:text-base rounded-md hover:bg-[#eb6753] hover:text-white"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="mt-5 flex flex-wrap md:flex-nowrap justify-between">
          <div className="">
            <a
              className="border-b-2 text-lg font-semibold border-transparent hover:border-[#eb6753]"
              href="/signin"
            >
              Or have any account ?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
