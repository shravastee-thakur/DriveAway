// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="relative flex justify-between items-center text-sm font-semibold py-6 px-4 md:px-12 bg-orange-400">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            <span className="text-white">Drive</span>Away
          </h1>
        </div>

        <div className="flex gap-4">
          <button className="bg-red-500 hover:bg-yellow-500 text-white px-4 py-2 rounded-md">
            <NavLink to={"/login"}>LOGIN</NavLink>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
