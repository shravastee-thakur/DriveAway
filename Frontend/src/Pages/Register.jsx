import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  //       const [user, setUser] = useState({
  //     name: "",
  //     email: "",
  //     phoneNumber: "",
  //     password: "",
  //     role: "",
  //   });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setUser({
  //       ...user,
  //       [name]: value,
  //     });
  //     console.log(user);
  //   };

  return (
    <section className="mt-8 lg:mt-14 flex justify-center items-center">
      <div className="relative w-10/12 sm:w-3/4 md:w-2/5 lg:w-1/4 border-2 rounded-xl p-4 md:p-6 bg-neutral-200">
        <h1 className="text-center mt-3 text-2xl font-bold">Register</h1>

        <form className="p-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Name</label>
            <input
              //   onChange={handleChange}
              className="border p-2 rounded-lg bg-white"
              type="text"
              placeholder="Enter your name"
              name="name"
              //   value={user.name}
            />
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <label className="text-sm font-semibold">Email</label>
            <input
              //   onChange={handleChange}
              className="border p-2 rounded-lg bg-white"
              type="email"
              placeholder="Enter your email"
              name="email"
              //   value={user.email}
            />
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <label className="text-sm font-semibold">Phone Number</label>
            <input
              //   onChange={handleChange}
              className="border p-2 rounded-lg bg-white"
              type="number"
              placeholder="Enter your phone number"
              name="phoneNumber"
              //   value={user.phoneNumber}
            />
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <label className="text-sm font-semibold">Password</label>
            <input
              //   onChange={handleChange}
              className="border p-2 rounded-lg bg-white"
              type="password"
              placeholder="Enter your password"
              name="password"
              //   value={user.password}
            />
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold p-2 rounded-lg"
            >
              Register
            </button>
            <p className="mt-2 text-center text-sm">
              Already have an account?
              <NavLink className="text-indigo-600 font-semibold" to={"/login"}>
                Login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
