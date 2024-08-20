// import cryser from "../css/cryser.gif";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import lottieJson from "../assets/notFound.json";


function notFound() {
  return (
    <div className="min-h-screen bg-black ">
      <div className="pt-10 pl-10">
        <Link
          to="/"
          className=" bg-[#61df6e] hover:bg-[#0b6f15] hover:text-white w-fit h-fit p-3 rounded-lg text-black"
        >
          Back Home
        </Link>
      </div>
      <div className="flex justify-center -mt-32">
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 600, height: 600 }}
        />
      </div>
    </div>
  );
}
export default notFound;