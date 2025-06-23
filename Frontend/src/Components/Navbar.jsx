import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken, role, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    const success = await logout();
    if (success) {
      navigate("/");
    }
  };
  return (
    <>
      <nav className="relative flex justify-between items-center text-sm font-semibold py-6 px-4 md:px-12 bg-[#3E7B27]">
        <div>
          <NavLink to={"/"}>
            <h1 className="text-2xl text-yellow-200 md:text-3xl lg:text-4xl font-bold">
              <span className="text-white">Drive</span>Away
            </h1>
          </NavLink>
        </div>

        <div>
          {accessToken && (
            <div className="relative py-2 group">
              <button className="text-white" onClick={toggleDropdown}>
                <AccountCircleIcon fontSize="large" />
              </button>

              <div
                className={`absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-amber-50 border border-gray-600 ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <p
                  onClick={handleLogout}
                  className="cursor-pointer text-red-700 text-sm"
                >
                  Logout
                </p>

                {role === "admin" && (
                  <>
                    <hr className="my-2 border-t border-gray-500" />
                    <NavLink
                      to={"/admin"}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <p className="cursor-pointer text-sky-800 text-sm">
                        Admin
                      </p>
                    </NavLink>
                    <hr className="my-2 border-t border-gray-500" />
                    <NavLink
                      to={"/addcar"}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <p className="cursor-pointer text-black text-sm">
                        Add Car
                      </p>
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
