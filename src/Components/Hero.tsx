import  Leagues  from "./Leagues";
function Hero() {
  const links = [
    { title: "Premier League", link: "" },
    { title: "La Liga", link: "" },
    { title: "Champions League", link: "" },
    { title: "Bundesliga", link: "" },
    { title: "Ligue 1", link: "" },
    { title: " Europa League", link: "" },
    { title: "Serie A", link: "" },
    { title: "Championship", link: "" },
    { title: "FA Cup", link: "" },
  ];

  return (
    <div className=" xl:block md:hidden max-sm:hidden ">
      <div className=" fixed w-80 top-20">
        <div className="h-auto xl:p-1 md:p-2 font-walsheim text-white  bg-[#1d1d1d] xl:ml-10 2xl:ml-24 md:ml-2 mt-3 rounded-xl">
          <h1 className=" font-bold p-2 ml-2 text-xl md:pl-2 mb-3">
            Top Leagues
          </h1>
          <hr className=" border-t-2 border-gray-700" />
          <div className="flex  text-md flex-col">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className=" p-3 w-full hover:bg-[#656565]"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
        <Leagues />
      </div>
    </div>
  );
}
export default Hero;
