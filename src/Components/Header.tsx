import { useEffect, useState } from "react";
import "../css/toggle.css";
import { Link } from "react-router-dom";
import Authentification from "./Authentification"

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [setting, setSetting] = useState(false);
  const toggleLogin = () => {
      setSetting(false);
      setLoginVisible(!loginVisible);
    };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const toggleSettings = () => {
    setSetting(!setting);
  };
  const logOut = () => {
    localStorage.removeItem("SignUp");
    setAuth(false);
  }
   const localSignUp = localStorage.getItem("SignUp");
   const [Auth, setAuth] = useState(false);
   useEffect(() => {
     if (localSignUp) {
       setAuth(true);
     }
   });
  return (
    <div className="bg-[#1d1d1d] top-0 fixed w-full z-50">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <nav className="flex items-center justify-between text-white py-5 px-4 md:px-9">
        <Link to="/" className="font-bold text-2xl md:text-3xl">
          FOOTBALL APP
          <i className="fa-solid fa-futbol ml-3 md:ml-5"></i>
        </Link>
        <form action="" className="relative hidden md:block md:w-1/3 lg:w-1/4">
          <i className="fa-solid fa-magnifying-glass absolute top-3 left-3"></i>
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="text-white placeholder:text-white pl-10 py-2 w-full rounded-3xl bg-[#262626]"
          />
        </form>
        <i
          className="block md:hidden text-2xl cursor-pointer"
          onClick={toggleVisibility}
        >
          <i className="fa-solid fa-bars"></i>
        </i>
        <ul
          className={`${
            isVisible ? "block" : "hidden"
          } absolute top-16 right-0 bg-[#262626] w-full md:w-auto md:relative md:flex md:items-center md:space-x-8 md:bg-transparent md:top-0 md:right-0 md:mt-0 p-4 md:p-0 md:border-none`}
        >
          <li className="md:inline-block">
            <Link
              to="/details"
              className="block md:inline-block py-2 px-3 md:py-0 md:px-0 hover:underline"
            >
              News
            </Link>
          </li>
          <li className="md:inline-block">
            <Link
              to="/transfers"
              className="block md:inline-block py-2 px-3 md:py-0 md:px-0 hover:underline"
            >
              Transfers
            </Link>
          </li>
          <li className="md:inline-block">
            <Link
              to="/aboutus"
              className="block md:inline-block py-2 px-3 md:py-0 md:px-0 hover:underline"
            >
              About Us
            </Link>
          </li>
          <li className="md:inline-block" onClick={toggleSettings}>
            <i className="fa-solid fa-gear hover:text-slate-400 cursor-pointer block md:inline-block py-2 px-3 md:py-0 md:px-0"></i>
          </li>
        </ul>
        {loginVisible && (
          <>
            <Authentification closeComponent={toggleLogin} />
          </>
        )}
        {setting && (
          <>
            <div className=" fixed right-10 top-20 rounded-xl bg-slate-600 flex flex-col overflow-hidden">
              {Auth ? (
                <button
                  onClick={logOut}
                  className="my-1 hover:bg-slate-700 px-8 py-2"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={toggleLogin}
                  className="my-1 hover:bg-slate-700 px-8 py-2"
                >
                  Log In
                </button>
              )}
              <a href="" className="my-1 hover:bg-slate-700 px-7 py-2">
                Theme <span className=""> ☀️ </span> <span> 🌙 </span>
              </a>
              <a href="" className="my-1 hover:bg-slate-700 px-8 py-2">
                Language
              </a>
            </div>
          </>
        )}
      </nav>
      <hr className="border-t-1 border-gray-500" />
    </div>
  );
}

export default Header;
