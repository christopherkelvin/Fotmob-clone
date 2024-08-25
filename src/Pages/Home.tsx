import Extra from '../Components/Extra'
import Hero from '../Components/Hero'
import Main from '../Components/Main'
export default function index() {
  return (
    <>
      <div className=" bg-black min-h-screen ">
        <div className="lg:grid lg:grid-cols-home mx-10 ">
          <Hero />
            <Main />

          <Extra />
        </div>
      </div>
    </>
  );
}
