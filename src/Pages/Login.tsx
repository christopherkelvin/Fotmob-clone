import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import image from "../assets/Stadium.jpg";
import { useAuth } from "../auth/AuthContext";

const Login: React.FC = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email.current && password.current) {
      login(email.current.value, password.current.value);
      navigate("/");
    }
  };

  return (
    <>
      <div
        className="relative min-h-screen mt-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div
          id="form"
          className="relative z-10 font-roboto flex justify-center items-center min-h-screen"
        >
          <div className="bg-[#262626] p-6 rounded-md shadow-md">
            <h1 className="text-center text-2xl uppercase text-white font-walsheim mb-4">
              PLEASE Login
            </h1>
            <input
              type="email"
              placeholder="User Email"
              className="p-2 rounded-md w-full mb-4 bg-white/20 text-black placeholder:text-black"
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 rounded-md w-full mb-4 bg-white/20 text-white placeholder:text-black"
              ref={password}
            />
            <button
              className="bg-white/10 hover:bg-white/40 hover:text-black/90 transition uppercase text-white p-2 rounded-md w-full"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
