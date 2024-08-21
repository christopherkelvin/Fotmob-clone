import Extra from '../Components/Extra'
import Hero from '../Components/Hero'
import Main from '../Components/Main'
export default function index() {
    return (
      <>
        <div className=" bg-black min-h-screen ">
          <div className="grid grid-cols-home">
            <Hero />
            <Main />
            <Extra />
          </div>
        </div>
      </>
    );
}
