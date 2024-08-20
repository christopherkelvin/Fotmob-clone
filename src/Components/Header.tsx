import { useState } from "react";
import  "../css/toggle.css";
import { Link } from "react-router-dom";
function Header() {
  const [isVisible, setIsVisible] = useState(false);
   const toggleVisibility = () => {
     setIsVisible(!isVisible);
  };
  // console.log(isVisible);
  return (
    <div className="bg-[#1d1d1d]">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <nav className="flex text-white  py-5">
        <Link to="/" className=" font-bold px-9 text-3xl">
          FOOTBALL APP
          <i className="fa-solid fa-futbol ml-5"></i>
        </Link>
        <form action="" className=" relative sm:w-1/2 md:w-1/3 lg:w-1/4">
          <i className="fa-solid text-white fa-magnifying-glass absolute top-4 left-3"></i>
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className=" text-white placeholder:text-white mt-1 pl-10 font-dancing w-full h-9 rounded-3xl bg-[#262626]"
          />
        </form>
        <i
          className={`absolute 2xl:hidden md:block right-4 mt-3 fa-solid fa-ellipsis-vertical`}
          onClick={toggleVisibility}
        ></i>
        <ul
          className={`absolute md:flex-col xl:block md:mt-9 lg:mt-0 md:rounded-md md:bg-slate-800
             lg:bg-inherit md:px-5 md:flex md:right-0 md:mr-2 
            lg:right-9 font-extrabold text-lg pt-4${
              isVisible ? "expand" : "collapse"
            }`}
        >
          <Link to="/details" className="mr-8 hover:underline">
            News
          </Link>
          <Link to="/transfers" className="mr-8 hover:underline">
            Transfers
          </Link>
          <Link to="/aboutus" className="mr-8 hover:underline">
            About Us
          </Link>
          <i className="fa-solid fa-gear hover:text-slate-400 cursor-pointer"></i>
        </ul>
      </nav>
      <hr className=" border-t-1 border-gray-500" />
    </div>
  );
}

export default Header;
