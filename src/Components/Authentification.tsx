import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";

function logIn({ closeComponent }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const email = useRef();
  // eslint-disable-next-line react-hooks/rules-of-hooks
    const password = useRef();
   
  const handleClick = () => {
    if (email.current.value && password.current.value) {
      localStorage.setItem("email", email.current.value);
      localStorage.setItem("password", password.current.value);
        localStorage.setItem("SignUp", email.current.value);
        alert('signed in')
      closeComponent();
      }
  };
  return (
    <>
      <div className="modal fixed w-screen h-[100vh] inset-0">
        <div className="overlay font-pacifico h-screen relative bg-black/10 backdrop-blur-sm ">
          <div className="content bg-[#262626] absolute p-8 top-1/3 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 ">
            <IoIosClose
              className="absolute top-2 text-2xl right-4 cursor-pointer hover:text-red-900"
              onClick={closeComponent}
            />
            <h2 className=" text-center -mt-5 mb-4">SIGN-IN</h2>
            <div className="flex flex-col gap-4 items-center">
              <input
                type="text"
                className=" rounded-md bg-slate-300/90 text-black/50 placeholder:text-black/50 pl-3 h-8 "
                placeholder="Enter your email"
                ref={email}
              />
              <input
                type="password"
                className=" rounded-md bg-slate-300/90 text-black/50 placeholder:text-black/50 pl-3 h-8 "
                placeholder="Enter your password"
                ref={password}
              />
              <button
                className="bg-slate-500 w-[60%] rounded-lg p-1 text-black"
                onClick={handleClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default logIn;
