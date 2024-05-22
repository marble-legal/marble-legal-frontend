// import { Link } from "react-router-dom";
import LayoutSvg from "../assets/images/auth-layout.svg";
// import LogoIcon from "../assets/icons/logo.svg";
import useViewportHeight from "../helpers/useViewportHeight";

export function Layout({ children }: { children: React.ReactNode }) {
  // check if location is /login
  const viewportHeight = useViewportHeight();

  return (
    <div
      className="w-full lg:h-screen lg:overflow-hidden flex"
      style={{ height: viewportHeight }}
    >
      <div className="flex-1 lg:block hidden relative m-4 relative rounded-[32px] bg-[#D6FEE3]">
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
          className="w-full h-full object-cover absolute left-0 top-0 z-[1] rounded-[8px]"
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
