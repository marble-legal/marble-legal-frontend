import LayoutSvg from "../assets/images/auth-layout.svg";

export function Layout({ children }: { children: React.ReactNode }) {
  // check if location is /login

  return (
    <div className="w-full lg:h-screen lg:overflow-hidden flex h-[100vh]">
      <div className="flex-1 lg:flex hidden relative m-4 rounded-[32px] bg-[#D6FEE3] justify-center align-center">
        {/* <div className="text-center grid gap-4 mt-32 z-[2] relative">
          <h1 className="text-[2rem] font-[700] absolute top-32 top-1/2 transform -translate-y-1/2 w-full z-[2]">
            Putting the law in your hands
          </h1>
          <h2 className="text-[1rem] max-w-[400px] mx-auto">
            Revolutionizing the legal landscape through resources, knowledge
            share, and artificial intelligence.
          </h2>
        </div> */}

        <img
          src={LayoutSvg}
          alt="layout"
          className="h-full object-cover z-[1] rounded-[8px]"
          loading="lazy"
        />
      </div>
      <div className="flex-1">
        {/* <Link to="/" className="mx-auto lg:hidden absolute left-4 top-4">
          <img src={LogoIcon} alt="logo" className="h-[1.375rem]" />
        </Link> */}
        {children}
      </div>
    </div>
  );
}
